const fs = require('fs').promises;
const path = require('path');
const filters = require('../config/filters');
const execShellCommand = require('./exec-shell-command');

// eslint-disable-next-line consistent-return
async function applyFilters(filename, filterName = 'cartoon') {
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
      const filter = filters[filterName];
      const filterCommand = filter.command({
        filepath,
        convertedFilepath,
      });
      // create filterized version of the image
      await execShellCommand(filterCommand);
      return true;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = applyFilters;
