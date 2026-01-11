#!/usr/bin/env nix-shell
{ pkgs ? import <nixpkgs> { } }:

(
  let
    base = pkgs.appimageTools.defaultFhsEnvArgs;
    pythonEnv = pkgs.python3.withPackages (ps: with ps; [
      beautifulsoup4
      # camelot
      icecream
      numpy
      pandas
      pillow
      pip
      pydantic
      # pypdf
      pymupdf
      sqlmodel
      typer
      werkzeug # webserver
    ]);
  in
  pkgs.buildFHSEnv (base // {
    name = "unical";
    targetPkgs = pkgs: (with pkgs; [
      gcc
      glibc
      pythonEnv
      ruff
      rustup
      sqlitebrowser
      ty
      uv
      zlib
    ]);
    runScript = "fish";
    extraOutputsToInstall = [ "dev" ];
  })
).env
