const withTypescript = require('@zeit/next-typescript'); 
const withMDX = require('@next/mdx')()
const withSass = require('@zeit/next-sass')

module.exports = withTypescript(
    withSass(
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
    )
); 