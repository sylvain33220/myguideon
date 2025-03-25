#!/bin/bash

echo "🧹 Nettoyage des images JPG du dossier public/assets/img..."

# Se placer au bon endroit si besoin
cd "$(dirname "$0")"

# Suppression des images .jpg du suivi Git (mais pas du disque)
find public/assets/img -type f -name "*.jpg" -exec git rm --cached {} \;

echo "✅ Les fichiers .jpg ont été retirés du suivi Git (toujours présents localement)."
echo "💡 N'oublie pas de faire : git commit -m \"🧹 Clean images\""

#!droit d'éxecution chmod +x clean-images.sh
