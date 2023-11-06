const fs = require('fs');
const xml2js = require('xml2js');

// Read the SVG font file
const svgFontData = fs.readFileSync(
  './apps/web-app/app/assets/icons/output/custom-icons.svg',
  'utf8',
);

// Parse the SVG font XML
xml2js.parseString(svgFontData, (err, result) => {
  if (err) {
    console.error('Error parsing SVG font:', err);
    return;
  }

  const icons = result.svg.defs[0].font[0].glyph;
  let cssContent = '';

  // Generate CSS for each icon
  icons.forEach((icon) => {
    const iconName = icon.$['glyph-name'];
    const unicode = icon.$.unicode;

    // Generate CSS class and content
    let cssClass = `.ts-${iconName}::before`;
    const cssContents = `  content: '\\${unicode}';`;

    // Append to CSS content
    cssContent += `\n\n${cssClass} {\n${cssContents}\n}`;

    console.log(`Generated CSS for ${iconName}`);
  });

  // Save the CSS file
  fs.writeFileSync('./apps/web-app/app/assets/icons/output/custom-icons.css', cssContent, 'utf8');
  console.log('CSS file generated successfully.');
});
