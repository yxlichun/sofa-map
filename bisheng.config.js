const path = require('path');

module.exports = {
  source: ['./components', './articles', 'CHANGELOG.md'],
  output: './_site',
  entry: {
    index: {
      theme: './_theme',
      htmlTemplate: './_theme/static/template.html',
    },
  },
  plugins: [
    'bisheng-plugin-react?lang=__react',
    'bisheng-plugin-antd',
  ],
  port: 9001,
};
