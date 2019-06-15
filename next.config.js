const withTypescript = require('@zeit/next-typescript'); 
const withMDX = require('@next/mdx')()

module.exports = withTypescript(
    withMDX({
        pageExtensions: ['ts', 'tsx', 'md', 'mdx'], 
        exportPathMap: function () {
            return {
                '/': {
                    page: '/'
                }
            };
        }
    })
); 