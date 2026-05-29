import glob from 'fast-glob';
import fs from 'node:fs';
import { minify } from 'terser';

async function minifyFiles() {
  const files = [
    ...(await glob('./lib/commonjs/**/*.js')),
    ...(await glob('./lib/module/**/*.js')),
  ];

  for (const file of files) {
    const code = fs.readFileSync(file, 'utf8');
    const result = await minify(code, {
      compress: true,
      mangle: true,
    });

    if (!result.code) {
      throw new Error(`Failed to minify ${file}`);
    }

    fs.writeFileSync(file, result.code);
    console.log(`Minified: ${file}`);
  }

  console.log('Minification complete!');

  const mapFiles = [...(await glob('./lib/**/*.map'))];

  for (const file of mapFiles) {
    fs.unlinkSync(file);
    console.log(`Removed: ${file}`);
  }

  const declarationFiles = [
    ...(await glob('./lib/typescript/**/*.d.ts')),
  ];

  for (const file of declarationFiles) {
    const contents = fs.readFileSync(file, 'utf8');
    const cleaned = contents.replace(
      /\n?\/\/# sourceMappingURL=.*$/u,
      '',
    );

    if (cleaned !== contents) {
      fs.writeFileSync(file, cleaned);
      console.log(`Cleaned: ${file}`);
    }
  }
}

minifyFiles().catch((error) => {
  console.error(error);
  process.exit(1);
});
