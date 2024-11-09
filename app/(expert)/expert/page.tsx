"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Currency from "@/components/ui/currency";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";

interface ExpertMetrics {
  totalRevenue: number;
  totalConsultations: number;
  averageConsultationFee: number;
  commission: number;
  netRevenue: number;
}

const WavyLoading = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-6 w-2/3 bg-gray-300 rounded-full dark:bg-gray-700"></div>
    <div className="h-6 w-1/2 bg-gray-300 rounded-full dark:bg-gray-700"></div>
    <div className="h-6 w-1/3 bg-gray-300 rounded-full dark:bg-gray-700"></div>
  </div>
);

const ExpertDashboardPage = () => {
  const [metrics, setMetrics] = useState<ExpertMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const {t}= useTranslation()
  const session= useSession();
  const expertId = session.data?.user.id
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(`/api/expert/metrics`, {
          params: {
            startDate: "2024-01-01", // Adjust this to the actual start date
            endDate: "2024-12-31",   // Adjust this to the actual end date
            expertId,
          },
        });

        setMetrics(response.data);
      } catch (error) {
        toast.error("Failed to fetch metrics");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [expertId]);

  if (loading) {
    return (
      <div className="space-y-8 p-8 min-h-screen bg-gradient-to-r from-green-500 via-teal-500 to-blue-500">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-white dark:bg-black bg-opacity-10 shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle className="text-white">Loading...</CardTitle>
              </CardHeader>
              <CardContent>
                <WavyLoading />
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 min-h-screen">
      {/* Revenue, Consultations, and AOV Summary */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-white dark:bg-black bg-opacity-10 shadow-lg hover:shadow-2xl transition-shadow rounded-lg">
          <CardHeader>
            <CardTitle className="text-white">{t("Total Revenue")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Currency value={metrics?.totalRevenue || 0} />
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-black bg-opacity-10 shadow-lg hover:shadow-2xl transition-shadow rounded-lg">
          <CardHeader>
            <CardTitle className="text-white">{t('Total Consultations')}</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl text-white">{metrics?.totalConsultations || 0}</span>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-black bg-opacity-10 shadow-lg hover:shadow-2xl transition-shadow rounded-lg">
          <CardHeader>
            <CardTitle className="text-white">{t("Average Consultation Fee")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Currency value={metrics?.averageConsultationFee || 0} />
          </CardContent>
        </Card>
      </motion.div>

      {/* Commission and Net Revenue Summary */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-white dark:bg-black bg-opacity-10 shadow-lg hover:shadow-2xl transition-shadow rounded-lg">
          <CardHeader>
            <CardTitle className="text-white">{t("Commission")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Currency value={metrics?.commission || 0} />
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-black bg-opacity-10 shadow-lg hover:shadow-2xl transition-shadow rounded-lg">
          <CardHeader>
            <CardTitle className="text-white">{t("Net Revenue")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Currency value={metrics?.netRevenue || 0} />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ExpertDashboardPage;
