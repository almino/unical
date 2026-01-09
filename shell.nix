#!/usr/bin/env nix-shell
{ pkgs ? import <nixos> { }, ... }:

# let
#   pythonEnv = pkgs.python3.withPackages (ps: with ps; [
#     # beautifulsoup4
#     camelot
#     icecream
#     pip
#     pydantic
#     sqlmodel
#     # werkzeug # webserver
#   ]);
# in

pkgs.mkShell {
  # buildInputs = with pkgs; [
  #   nodejs
  #   rustup
  # ] ++ [ pythonEnv ];
  packages = with pkgs; [
    bun
    corepack
    # pythonEnv
    # ruff
    # rustup
    sqlitebrowser
    # ty
    # uv
  ];
  # shellHook = ''
  # '';
}
