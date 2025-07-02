/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains:[
        "res.cloudinary.com",
        "lh3.googleusercontent.com",
        "api.agromonitoring.com",
    ]
},
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.css$/,
  //     use: ['style-loader', 'css-loader'],
  //   });
  //   return config;
  // },
};
  
export default nextConfig;
  