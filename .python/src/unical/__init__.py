from pathlib import Path

import pymupdf
import typer
from bs4 import BeautifulSoup
from rich import print
from werkzeug.utils import secure_filename

app = typer.Typer()


@app.command()
def extract_tables(filepath: str) -> None:
    file = pymupdf.open(filepath)

    pathable = Path(filepath)
    output_path = pathable.parent / f"{secure_filename(pathable.stem)}.html"
    output = ""

    for page in file:
        html = page.get_text("html")
        soup = BeautifulSoup(html, "html.parser")

        # Encontra todas as imagens
        imgs = soup.find_all("img")
        for img in imgs:
            img.decompose()
            # parent = img.parent
            # if parent is not None:
            #     parent.decompose()

        # Remove todos os estilos dos elementos <p>
        for tag in soup.find_all(["p", "div"]):
            if "style" in tag.attrs:
                del tag.attrs["style"]

        output += soup.prettify()
        output += "\n<hr style=\"margin: 100px 0;\" />\n"

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(output)
    print(f"[green]Arquivo salvo em {output_path}[/green]")


def main() -> None:
    app()


if __name__ == "__main__":
    app()
