/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,  // Enable App Router
  },
  images:{
    domains:[
        "res.cloudinary.com",
        "lh3.googleusercontent.com",
        "api.agromonitoring.com",
    ]
},
  };
  
  export default nextConfig;
  