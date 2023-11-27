// import the required libraries
const fs = require('node:fs');
const path = require('path');

// store the command line arguments
const sourcePath = process.argv[2];
const targetPath = process.argv[3];

// create the filter for the files
const isTxT = fileName => {
    return fs.lstatSync(fileName).isFile() && path.extname(fileName) === '.txt';
}

// store the filtered content
const content = fs.readdirSync(sourcePath).filter(isTxT)

// apply the copy process to the filtered content
for (let index=0; index < content.length; index++){
    fs.copyFileSync(`${sourcePath}/${content[index]}`, `${targetPath}/${content[index]}`)
}

// output completion
console.log("Done!")
