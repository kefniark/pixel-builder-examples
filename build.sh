#!/bin/sh

# Cleanup
rm -rf ./build
mkdir build

# Pixi Example
cd projects/pixi
yarn
yarn build
cd ../..
mv projects/pixi/build/web build/pixi

# BabylonJS Example
cd projects/babylon
yarn
yarn build
cd ../..
mv projects/babylon/build/web build/babylon

# Minimalist Example
cd projects/js13k
yarn
yarn build
cd ../..
mv projects/js13k/build/web build/js13k