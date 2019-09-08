const fs = jest.genMockFromModule('fs');
const mockFiles = {};

function writeFileSync(file, content) {
  mockFiles[file] = content;
}

function readFileSync(file) {
  return mockFiles[file];
}

fs.writeFileSync = writeFileSync;
fs.readFileSync = readFileSync;

module.exports = fs;
