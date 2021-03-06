module.exports = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        contentKey: process.env.contentKey,
        blogApiLink: process.env.blogApiLink,
        API_URL: 'http://localhost:1337/accounts'
    },
    images: {
        domains: ['res.cloudinary.com', 'nextjs-firstapplication.herokuapp.com'],
    },
    upload: {

        enabled: true,
    },
}

