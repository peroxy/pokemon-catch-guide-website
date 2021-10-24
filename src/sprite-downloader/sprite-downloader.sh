#!/bin/bash

for i in {1..898}; do
  wget "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/$i.png" -O "./public/sprites/artwork/$i.png"
  wget "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/$i.png"  -O "./public/sprites/icons/$i.png"
done