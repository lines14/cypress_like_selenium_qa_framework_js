const fs = require('fs');
const path = require('path');
const JSONDir = path.join(__dirname, '../../../resources');
const filePath = path.join(__dirname, 'JSONLoader.js');

function getJSONFiles(directory) {
    const allFiles = fs.readdirSync(directory);
    const JSONFiles = allFiles.filter((file) => file.endsWith('.json'));
    for (const file of allFiles) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            const nestedFiles = getJSONFiles(fullPath);
            JSONFiles.push(...nestedFiles.map((nestedFile) => path.join(file, nestedFile)));
        }
    }
    
    return JSONFiles;
}

function generateRequires(JSONFiles, JSONDir) {
    return JSONFiles.map((file) => {
        const variableName = path.parse(file).name;
        return `const ${variableName} = require('${path.join(JSONDir, file)}');\n`;
    }).join('');
}

function generateClassInit(JSONFiles) {
    return `\nclass JSONLoader {\n` + JSONFiles.map((file) => {
        const variableName = path.parse(file).name;
        return `\tstatic get ${variableName}() {\n\t\treturn JSON.parse(JSON.stringify(${variableName}));\n\t}\n\n`;
    }).join('');
}

function generateJSONLoader(filePath, JSONDir) {
    const JSONFiles = getJSONFiles(JSONDir);
    const requires = generateRequires(JSONFiles, JSONDir);
    const classInit = generateClassInit(JSONFiles);
    const classExport = '}\n\nmodule.exports = JSONLoader;';
    fs.writeFileSync(filePath, requires + classInit + classExport);
}

generateJSONLoader(filePath, JSONDir);