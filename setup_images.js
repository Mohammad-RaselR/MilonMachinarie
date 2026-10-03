const fs = require('fs');
const path = require('path');

const brainDir = '/home/cyfrin/.gemini/antigravity-ide/brain/7511675a-c987-4c5c-81cb-e7f43bbe63e6';
const targetDir = '/home/cyfrin/Documents/milon_machinaries/images';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

if (fs.existsSync(brainDir)) {
  const files = fs.readdirSync(brainDir);
  console.log('Brain files:', files);

  files.forEach(file => {
    if (file.endsWith('.png')) {
      const src = path.join(brainDir, file);
      let destName = file;

      if (file.includes('engine_lathe_machine')) destName = 'lathe.png';
      else if (file.includes('cnc_turning_center')) destName = 'cnc.png';
      else if (file.includes('vertical_machining_center')) destName = 'vmc.png';
      else if (file.includes('hydraulic_workshop_press')) destName = 'press.png';
      else if (file.includes('diesel_power_generator')) destName = 'generator.png';
      else if (file.includes('hero_machinery_workshop')) destName = 'hero.png';

      fs.copyFileSync(src, path.join(targetDir, destName));
      console.log(`Copied ${file} -> ${destName}`);
    }
  });
}
