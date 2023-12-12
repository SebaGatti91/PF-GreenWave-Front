/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  images: {
    domains: [
      "",
      'res.cloudinary.com',
      "i.imgur.com",
      "i.pinimg.com",
      "www.kienyke.com",
      "i.etsystatic.com",
      "encrypted-tbn0.gstatic.com",
      "estag.fimagenes.com",
      "m.media-amazon.com",
      "www.serzen.mx",
      "th.bing.com",
      "reqres.in"
    ],
  },
};

module.exports = {
  ...nextConfig,
  env: {
    FRONT: process.env.FRONT,
    BACK: process.env.BACK
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.mp4$/,
        use: 'file-loader?name=videos/[name].[ext]',
      });
    }
    return config;
  },
};
