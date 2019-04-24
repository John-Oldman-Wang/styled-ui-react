module.exports = function(version) {
  return `{
    "name": "@styled-ui/react",
    "version": "${version}",
    "description": "react material ui component styled-components",
    "main": "./index.js",
    "email": "wanglin.john@bytedance.com",
    "repository": {
        "type": "git",
        "url": "git+https://github.com/nokisnojok/-ui.git"
    },
    "scripts": {
        "test": "echo \\"Error: no test specified\\" && exit 1"
    },
    "keywords": [
        "react",
        "material design",
        "styled-components",
        "component"
    ],
    "bugs": {
        "url": "https://github.com/nokisnojok/-ui/issues"
    },
    "homepage": "https://github.com/nokisnojok/-ui#readme",
    "author": "wanglin",
    "license": "ISC"
}`;
};
