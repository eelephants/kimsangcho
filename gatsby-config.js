module.exports = {
       siteMetadata: {
              title: 'kimsangcho',
              description: 'test',
       },
       plugins: [
              'gatsby-plugin-emotion',
              'gatsby-plugin-gatsby-cloud',
              'gatsby-plugin-image',
              {
                     resolve: 'gatsby-plugin-google-analytics',
                     options: {
                            trackingId: 'G-7ZRTF6N0G3',
                     },
              },
              'gatsby-plugin-react-helmet',
              'gatsby-plugin-sitemap',
              {
                     resolve: 'gatsby-plugin-manifest',
                     options: {
                            icon: 'src/assets/images/icon.png',
                     },
              },
              'gatsby-transformer-remark',
              'gatsby-plugin-mdx',
              'gatsby-plugin-sharp',
              'gatsby-transformer-sharp',
              {
                     resolve: 'gatsby-source-filesystem',
                     options: {
                            name: 'images',
                            path: './src/assets/images/',
                     },
                     __key: 'images',
              },
              {
                     resolve: 'gatsby-source-filesystem',
                     options: {
                            name: 'pages',
                            path: './src/pages/',
                     },
                     __key: 'pages',
              },
       ],
};
