"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
// const api_key= '406dfb054d42ae054494295e880c5767'
type Article = {
  title:string;
  urlToImage:string;
  description:string;
  url:string;
}
const NewsFeed = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
        const url = 'https://newsapi.org/v2/everything?' +
            'q=%2Bagriculture%20AND%20(crops%20OR%20farming%20OR%20harvest)&' +
            'searchIn=title,description&' +
            'from=2024-11-02&' +  // Adjust the date as needed
            'sortBy=relevancy&' +
            'language=en&' +
            'pageSize=10&' + // Limit results per page for manageability
            'apiKey=6ae260c8c3e64d4b93811a0c7df11625'; // Replace with your actual API key

      try {
        const response = await fetch(url);
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("NEWS_FETCH", error);
      }
    };
    fetchNews();
    fetch('https://openfarm.cc/api/v1/crops/?filter=rice')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error fetching crop data:', error));

  }, []);

  return (
    <div className="bg-[#f9f7f0] py-10 px-5 max-w-screen-lg mx-auto">
      <motion.h2
        className="text-center text-3xl font-bold text-green-700 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🌾 Agriculture News
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles && articles.length>0 && articles.map((article, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="h-48 overflow-hidden">
              <motion.img
                src={article.urlToImage || "/default-image.jpg"}
                alt={article.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-green-700 mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-700 line-clamp-3">
                {article.description}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-green-700 font-medium border border-green-700 px-3 py-1 rounded-lg hover:bg-green-700 hover:text-white transition-colors"
              >
                Read More
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
