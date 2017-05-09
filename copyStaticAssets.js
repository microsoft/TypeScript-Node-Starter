var shell = require('shelljs');

shell.cp('-R', 'src/public/js/lib', 'dist/public/js/lib');
shell.cp('-R', 'src/public/fonts', 'dist/public/fonts');
shell.cp('-R', 'src/public/images', 'dist/public/images');