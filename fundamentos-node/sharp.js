const sharp = require('sharp')

sharp('./soloLeveling.jpg')
    .resize(80)
    .toFile('resized.png')