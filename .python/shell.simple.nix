#!/usr/bin/env nix-shell
{ pkgs ? import <nixos> { }, ... }:

let
  pythonEnv = pkgs.python3.withPackages (ps: with ps; [
    beautifulsoup4
    # camelot
    icecream
    pip
    pydantic
    pymupdf
    sqlmodel
    werkzeug # webserver
  ]);
in

pkgs.mkShell {
  packages = with pkgs; [
    pythonEnv
    ruff
    rustup
    sqlitebrowser
    ty
    uv
  ];
  shellHook = ''
    uv lock --quiet --python ${pythonEnv}/bin/python
    uv sync --active --no-install-project --frozen --quiet --python ${pythonEnv}/bin/python
  '';
}
