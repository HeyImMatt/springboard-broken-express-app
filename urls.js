const fs = require('fs');
const process = require('process');
const axios = require('axios');

function getUrls(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      const urls = data.split('\n').filter((url) => {
        return url !== '';
      });
      getUrlData(urls);
    }
  });
}

function getUrlData(urls) {
  urls.forEach(async (url) => {
    const afterSecondSlashIdx = url.indexOf('/') + 2;
    const thirdSlashIdx = url.indexOf('/', afterSecondSlashIdx) !== -1 ? url.indexOf('/', afterSecondSlashIdx) : null;
    const fileName = url.slice(afterSecondSlashIdx, thirdSlashIdx || url.length) + '.txt';
    try {
      const resp = await axios.get(url, {timeout: 5000});
      handleOutput(resp.data, fileName)
    } catch (err) {
      console.error(`Could not download ${url}: ${err}`);
    }
  });
}

function handleOutput(text, outputFile) {
  fs.writeFile(outputFile, text, 'utf8', function(err) {
    if (err) {
      console.error(`Couldn't write ${outputFile}: ${err}`);
    } else console.log(`Wrote to ${outputFile}`)
  });
}

getUrls(process.argv[2]);
