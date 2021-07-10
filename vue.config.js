module.exports = {
    devServer: {
        host: 'localhost',
        port: 8081,
        proxy: {
            '/': {
                ws: false,
                target: 'http://10.81.229.156:8080',
                changeOrigin: true,
                pathReWrite: {
                    '^/': '/'
                },
            }
        },
    }
}