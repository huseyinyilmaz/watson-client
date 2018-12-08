{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  # this will make all the build inputs from hello and gnutar
  # available to the shell environment
  # inputsFrom = with pkgs; [ hello ];
  buildInputs = [ pkgs.nodejs-10_x
                  pkgs.yarn
                 ];
  # shellHook = "echo \"testXXXXXXXXXXXXXXXXXXXXXXX\"";
  # echo "Shell is created"
  # '';
}
