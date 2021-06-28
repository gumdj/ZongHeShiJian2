module.exports = {
    devServer: {
        host: 'localhost',
        port: 8081,
        proxy: {
            '/': {
                ws: false,

                target: 'http://10.8.122.129:8080',

                changeOrigin: true,

                pathReWrite: {
                    '^/': '/'
                },
            }
        },
    }
}