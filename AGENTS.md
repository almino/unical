# Agentes - Documentação

Este documento explica como trabalhar com os arquivos de calendário acadêmico.

## Estrutura do Arquivo YAML

Os arquivos em `content/semestres/*.yaml` seguem esta estrutura:

```yaml
nome: 2026.1 # Identificador do semestre
nivel: grad # Nível: grad, pós, etc.
oficios: # Lista de resoluções/ofícios
  - RESOLUÇÃO N° ...
url: https://... # URL do PDF original
ini: 2026-03-30 # Data de início do semestre
fim: 2026-07-31 # Data de término do semestre
dias_letivos: 102 # Total de dias letivos
ocultar_em: 2026-08-12 # Diz quando parar de exibir na página inicial

meses_letivos: # Meses que compõem o semestre
  - mes: 2026-03
    dias_letivos: 2
    nome: março de 2026

eventos: # Lista de eventos do calendário
  - data: 2026-03-30
    tipo: ini-semestre
    texto: INÍCIO DO SEMESTRE LETIVO 2026.1
```

### Campos de Evento

| Campo         | Obrigatório | Descrição                                                                         |
| ------------- | ----------- | --------------------------------------------------------------------------------- |
| `data`        | Sim         | Data principal do evento (AAAA-MM-DD)                                             |
| `texto`       | Sim         | Descrição do evento                                                               |
| `tipo`        | Não         | Categoria: `feriado`, `ini-semestre`, `fim-semestre`, `matrícula`, `comemorativa` |
| `inicia`      | Não         | Data de início de um período (quando difere de `data`)                            |
| `termina`     | Não         | Data de término de um período (quando difere de `data`)                           |
| `agente`      | Não         | Quem deve realizar: `Docentes`, `Discentes`, `Coordenações`                       |
| `localidades` | Não         | Lista de cidades/campi específicos                                                |

### Regra: data vs inicia vs termina

**Princípio**: O campo `data` representa a data mais importante do evento. Os campos `inicia` e `termina` são usados **apenas** quando precisamos establecer uma relação entre eventos de início e fim.

#### Exemplos:

1. **Quando usar `termina`:**

   ```yaml
   # data = inicio, mas tem data de término diferente
   - data: 2026-03-30
     termina: 2026-04-10
     texto: Período de solicitação de algo
   ```

2. **Quando usar `inicia`:**
   ```yaml
   # data = fim do período, mas tem uma data de início diferente
   - data: 2026-04-10
     inicia: 2026-02-02
     texto: Prazo final para o resultado das solicitações
   ```

#### Casos especiais:

- **Eventos de "prazo final" ou "resultado"**: Devem ter `inicia` apontando para o evento de início correspondente.
- **Eventos de "período" com início e fim diferentes**: Usam `inicia` e `termina` quando `data` representa uma data intermediária.
- **Feriados com período** (ex: Recesso): Usam `termina` quando `data` é o primeiro dia.

---

## Fluxo: PDF → YAML

O processo de conversão é executado manualmente por um humano (não por agente LLM):

### Passo 1: Converter PDF para HTML com imagens

```bash
pdftohtml -c -s -noframes -hidden semestre.pdf semestre.html
```

Parâmetros:

- `-c`: Gera HTML complexo
- `-s`: Um único arquivo HTML com todas as páginas
- `-noframes`: Sem frames
- `-hidden`: Incluir texto oculto

### Passo 2: Limpar o HTML

Executar o script Python que limpa o HTML:

```bash
uv run unical semestre.html
```

Este script:

- Remove estilos CSS desnecessários
- Gera um HTML mais simples de processar

### Passo 3: Criar o YAML

Um agente LLM pode então ler o HTML limpo e criar o arquivo YAML seguindo:

1. Extrair os dados do cabeçalho (nome,ini,fim,dias_letivos)
2. Listar os meses letivos com seus dias
3. Para cada evento no HTML:
   - Identificar a data
   - Identificar o tipo (se aplicável)
   - Identificar o agente (se aplicável)
   - Identificar localidades (se aplicável)
   - Aplicar a regra data/inicia/termina

---

## Dicas para Agentes

### Identificando eventos de período

Procure por padrões no texto:

- **Contém "Início do período"**: events com `data` = data de início
- **Contém "Período de"**: Geralmente é um intervalo, veja se há `termina`
- **Contém "Prazo final" / "Término" / "Fim"**: events de encerramento, procure o evento de início correspondente

### Identificando o agente

O agente é frequentemente mencionado no final do texto:

- "...pelos alunos" → `agente: Discentes`
- "...pelos professores" ou "...pelos docentes" → `agente: Docentes`
- "...pelas Coordenações" → `agente: Coordenações`

### Tipos de eventos

Use `tipo` para:

- `feriado` - Feriados nacionais, estaduais, municipais
- `ini-semestre` - Início do semestre letivo
- `fim-semestre` - Término do semestre letivo
- `matrícula` - Eventos relacionados a matrícula
- `comemorativa` - Dias comemorativos (dia do professor, dia do estudante, etc.)
