const fs = require('fs').promises;
const execShellCommand = require('./exec-shell-command');

async function applyFilters(filename, filterName = 'cartoonize') {
  const filepath = path.resolve('./', 'public', 'uploads', filename);
  try {
    const filestats = await fs.stat(filepath);
    if (filestats) {
      const splittedFilename = filename.split('.');
      const filenameWithoutExtension = splittedFilename[0];
      const fileExtension = splittedFilename[1];
      const convertedFilename = `${filenameWithoutExtension}-converted.${fileExtension}`;
      const convertedFilepath = path.resolve(
        './',
        'public',
        'images',
        `${convertedFilename}`
      );
      // create cartoonized version of the image
      await execShellCommand(
        `convert ${filepath} -kuwahara 3 -unsharp 0x2+4+0 ${convertedFilepath}`
      );
      return true;
    }
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

module.exports = applyFilters;
