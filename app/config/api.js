module.exports = {
    url: `http://localhost`,
    prefix: 'api',
    port: {
        http: 3000,
    },
    jwt: {
        public: 'public-key',
        private: 'private-key',
        algorithm: 'HS512'
    }
}