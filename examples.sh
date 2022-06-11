#!/bin/sh

# Cleanup
echo "Cleanup"
rm -rf ./projects
mkdir ./projects

# Pixi Example
node ../pixel-builder/libs/cli/dist/index.js create projects/pixi -t pixi -f lint,test,git,github,vscode

# BabylonJS Example
node ../pixel-builder/libs/cli/dist/index.js create projects/babylon -t babylon -f lint,test,git,github,vscode

# Minimalist Example
node ../pixel-builder/libs/cli/dist/index.js create projects/js13k -t mini -f lint,test,git,github,vscode