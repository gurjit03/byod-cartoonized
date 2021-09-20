# Byod cartoonized

An express server running imagemagick command to filterize the images to a cartoonized version.

## Installation

1. Install all the packages using

```
npm install
```

2. Needs to have imagemagick installed on your machine. Follow appropriate instructions based on your target machine os - mac/windows/macos.

## Directory structure

### controllers

Include controllers for the application that manages the code for handling request

### lib

Includes all the external npm package configurations we are using if any. Currently we are using multer for file handling.

### routes

Includes code for mapping the controller functions to the actual request type ( GET/POST/PUT)

### utils

Includes all the utility functions
