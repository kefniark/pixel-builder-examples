#!/bin/sh

# Cleanup
rm -rf ./build
mkdir build

# Pixi Example
cd projects/pixi
yarn
yarn link "@pixel-builder/cli"
yarn link "@pixel-builder/core"
MSYS_NO_PATHCONV=1 yarn build
cd ../..
mv projects/pixi/build/web build/pixi

cp -R build/pixi/* /c/Users/Kef/Downloads/pixel-builder-examples-gh-pages/local/pixi/

# BabylonJS Example
# cd projects/babylon
# yarn
# yarn build
# cd ../..
# mv projects/babylon/build/web build/babylon

# # Minimalist Example
# cd projects/js13k
# yarn
# yarn build
# cd ../..
# mv projects/js13k/build/web build/js13k