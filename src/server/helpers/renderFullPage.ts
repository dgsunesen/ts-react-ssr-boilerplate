interface RenderOptions {
    html?: string;
    styleTags?: any;
}

module.exports = ({ html, styleTags }: RenderOptions): string => `
    <!DOCTYPE html>
    <meta charset="utf-8">
    <title>ts-react-ssr boilerplate</title>
    <link rel="manifest" href="manifest.json">
    <link rel="shortcut icon" href="/static/favicon.ico" />
    ${styleTags || ''}
    ${html ? '<link rel="stylesheet" type="text/html" href="/style.css">' : ''}
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

    <div id="app">${html || ''}</div>
    <script src="${html ? '' : '/dist'}/vendors.js"></script>
    <script src="${html ? '' : '/dist'}/runtime~app.js"></script>
    <script src="${html ? '' : '/dist'}/app.js"></script>
`;
