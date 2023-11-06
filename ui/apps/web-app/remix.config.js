/**
 * @type {import('@remix-run/dev').AppConfig}
 */
const { getDependenciesToBundle } = require('@remix-run/dev');

module.exports = {
  ignoredRouteFiles: ['**/.*'],
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  serverBuildPath: 'build/index.js',
  publicPath: '/build/',
  watchPaths: ['../../libs', '../../node_modules/react-bootstrap/esm'],
  serverDependenciesToBundle: [
    '../../node_modules/react-bootstrap/esm',
    'axios',
    /^rehype.*/,
    /^trim-lines.*/,
    /^remark.*/,
    /^unified.*/,
    /^unist.*/,
    /^hast.*/,
    /^bail.*/,
    /^trough.*/,
    /^mdast.*/,
    /^micromark.*/,
    /^decode.*/,
    /^character.*/,
    /^property.*/,
    /^space.*/,
    /^comma.*/,
    /^react-markdown$/,
    /^vfile.*/,
    /^hljs.*/,
  ],
};
