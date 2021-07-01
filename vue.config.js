module.exports = {
    devServer: {
        host: 'localhost',
        port: 8081,
        proxy: {
            '/': {
                ws: false,

                target: 'http://localhost:8080',

                changeOrigin: true,

                pathReWrite: {
                    '^/': '/'
                },
            }
        },
    }
}