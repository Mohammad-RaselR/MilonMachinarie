const fs = require('fs');
const path = require('path');

const brainDir = '/home/cyfrin/.gemini/antigravity-ide/brain/7511675a-c987-4c5c-81cb-e7f43bbe63e6';
const dataJsPath = '/home/cyfrin/Documents/milon_machinaries/js/data.js';
const indexHtmlPath = '/home/cyfrin/Documents/milon_machinaries/index.html';

let dataJs = fs.readFileSync(dataJsPath, 'utf8');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

if (fs.existsSync(brainDir)) {
  const files = fs.readdirSync(brainDir);
  files.forEach(file => {
    if (file.endsWith('.png')) {
      const fullPath = path.join(brainDir, file);
      const base64 = fs.readFileSync(fullPath).toString('base64');
      const dataUri = `data:image/png;base64,${base64}`;

      if (file.includes('engine_lathe_machine')) {
        dataJs = dataJs.replaceAll('"images/lathe.png"', `"${dataUri}"`);
      } else if (file.includes('cnc_turning_center')) {
        dataJs = dataJs.replaceAll('"images/cnc.png"', `"${dataUri}"`);
      } else if (file.includes('vertical_machining_center')) {
        dataJs = dataJs.replaceAll('"images/vmc.png"', `"${dataUri}"`);
      } else if (file.includes('hydraulic_workshop_press')) {
        dataJs = dataJs.replaceAll('"images/press.png"', `"${dataUri}"`);
      } else if (file.includes('diesel_power_generator')) {
        dataJs = dataJs.replaceAll('"images/generator.png"', `"${dataUri}"`);
      } else if (file.includes('hero_machinery_workshop')) {
        dataJs = dataJs.replaceAll('"images/hero.png"', `"${dataUri}"`);
        indexHtml = indexHtml.replaceAll('src="images/hero.png"', `src="${dataUri}"`);
      }
    }
  });
}

fs.writeFileSync(dataJsPath, dataJs);
fs.writeFileSync(indexHtmlPath, indexHtml);
console.log('Successfully embedded images into data.js and index.html!');
