const {readdir, readFile, writeFile} = require('fs/promises')
const {resolve: resolvePath, extname} = require('path');



async function makeBundle() {
    const allCssFiles =  'styles'
    const newCss =  'project-dist'
    const bundleCss = 'bundle.css'

  const notations = await readdir(resolvePath(__dirname, allCssFiles), {
    withFileTypes: true,
  });
  const cssFile = notations.filter((notation) => notation.isFile()).filter(({ name }) => extname(name) === '.css');
  const data = await Promise.all(
    cssFile.map(({ name }) =>
      readFile(resolvePath(__dirname, allCssFiles, name), 'utf8')
    )
  );
  writeFile(resolvePath(__dirname, newCss,bundleCss), data.join('\n'));
};
makeBundle()