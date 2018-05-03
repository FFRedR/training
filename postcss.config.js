module.exports = ({ file, options, env }) => {
    return {
        parser: file.extname === '.sss' ? 'sugarss' : false,
        browsers:['ie >= 8', 'last 4 version'],
        plugins: {
            'postcss-import': { root: file.dirname },
            'postcss-cssnext': options.env === 'production' ? options.cssnext : false,
        }
    }
}