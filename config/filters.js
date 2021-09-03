const filters = {
  cartoon: {
    command: ({ filepath, convertedFilepath }) =>
      `convert ${filepath} -kuwahara 3 -unsharp 0x2+4+0 ${convertedFilepath}`,
  },
};
