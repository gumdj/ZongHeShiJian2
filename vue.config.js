module.exports = {
    devServer: {
        host: 'localhost',
        port: 8081,
        proxy: {
            '/': {
                ws: false,

                target: 'http://10.180.116.68:8080',

                changeOrigin: true,

                pathReWrite: {
                    '^/': '/'
                },
            }
        },
    }
}