"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart } from "@/components/ui/charts"; // Ensure this is properly implemented
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Currency from "@/components/ui/currency";
import { motion } from "framer-motion";

interface Metrics {
  totalRevenue: number;
  numberOfOrders: number;
  averageOrderValue: number;
  totalCustomers: number;
  productPerformance: { name: string; sales: number }[];
  salesByCategory: { categoryName: string; sales: number }[];
}
const WavyLoading = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-6 w-2/3 bg-gray-300 rounded-full dark:bg-gray-700"></div>
    <div className="h-6 w-1/2 bg-gray-300 rounded-full dark:bg-gray-700"></div>
    <div className="h-6 w-1/3 bg-gray-300 rounded-full dark:bg-gray-700"></div>
  </div>
);

const DashboardPage = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(`/api/metrics`, {
          params: {
            startDate: "2024-01-01",
            endDate: new Date(),
          },
        });
        const data = response.data;

        const adjustedData: Metrics = {
          totalRevenue: data.totalRevenue,
          numberOfOrders: data.totalOrders,
          averageOrderValue: data.aov,
          totalCustomers: data.uniqueCustomers,
          productPerformance: data.productPerformance,
          salesByCategory: data.salesByCategory,
        };

        setMetrics(adjustedData);
      } catch (error) {
        toast.error("Failed to fetch metrics");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

 
  if (loading) {
    return (
      <div className="space-y-8 p-8 min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-white      bg-opacity-10 shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle className="text-white">Loading...</CardTitle>
              </CardHeader>
              <CardContent>
                <WavyLoading />
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white      bg-opacity-20 shadow-lg rounded-lg p-4">
            <CardHeader>
              <CardTitle className="text-white">Loading Sales by Category...</CardTitle>
            </CardHeader>
            <CardContent>
              <WavyLoading />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-white      bg-opacity-20 shadow-lg rounded-lg p-4">
            <CardHeader>
              <CardTitle className="text-white">Loading Product Performance...</CardTitle>
            </CardHeader>
            <CardContent>
              <WavyLoading />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="space-y-8 p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      {/* Revenue, Orders, and AOV Summary */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-white      bg-opacity-10 shadow-lg hover:shadow-2xl transition-shadow rounded-lg">
          <CardHeader>
            <CardTitle className="text-white">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <Currency value={metrics?.totalRevenue || 0} />
          </CardContent>
        </Card>

        <Card className="bg-white      bg-opacity-10 shadow-lg hover:shadow-2xl transition-shadow rounded-lg">
          <CardHeader>
            <CardTitle className="text-white">Number of Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl text-white">{metrics?.numberOfOrders || 0}</span>
          </CardContent>
        </Card>

        <Card className="bg-white      bg-opacity-10 shadow-lg hover:shadow-2xl transition-shadow rounded-lg">
          <CardHeader>
            <CardTitle className="text-white">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <Currency value={metrics?.averageOrderValue || 0}  />
          </CardContent>
        </Card>
      </motion.div>

      {/* Sales by Category Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-white      bg-opacity-20 shadow-lg hover:shadow-2xl transition-shadow rounded-lg p-4">
          <CardHeader>
            <CardTitle className="text-white">Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={metrics?.salesByCategory || []} />
          </CardContent>
        </Card>
      </motion.div>

      {/* Product Performance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="bg-white      bg-opacity-20 shadow-lg hover:shadow-2xl transition-shadow rounded-lg p-4">
          <CardHeader>
            <CardTitle className="text-white">Product Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="min-w-full text-white     bg-opacity-10 border-separate border-spacing-0 rounded-lg">
              <thead>
                <tr>
                  <th className="py-3 text-left font-semibold">Product Name</th>
                  <th className="py-3 text-left font-semibold">Sales</th>
                </tr>
              </thead>
              <tbody>
                {metrics?.productPerformance.map((product) => (
                  <tr key={product.name} className="odd:bg-white odd:bg-opacity-10 even:bg-white      even:bg-opacity-5">
                    <td className="py-2 px-4">{product.name}</td>
                    <td className="py-2 px-4">{product.sales || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
