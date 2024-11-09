import prismadb from "@/lib/prismadb";

// Fetch the total revenue from consultations
const calculateTotalRevenue = async (startDate: Date, endDate: Date) => {
  const consultations = await prismadb.consultation.findMany({
    where: {
      status: 'completed',
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      amount: true,
    },
  });

  return consultations.reduce((total, consultation) => total + consultation.amount, 0);
};

// Calculate commission deduction
const calculateCommission = (totalRevenue: number, commissionRate: number) => {
  return totalRevenue * (commissionRate / 100);
};

// Calculate number of consultations
const calculateTotalConsultations = async (startDate: Date, endDate: Date) => {
  return await prismadb.consultation.count({
    where: {
        status: 'completed',
        date: {
        gte: startDate,
        lte: endDate,
      },
    },
  });
};

// Calculate average consultation fee
const calculateAverageConsultationFee = (totalRevenue: number, totalConsultations: number) => {
  return totalConsultations > 0 ? totalRevenue / totalConsultations : 0;
};

// Calculate feedback rating
// const calculateAverageRating = async (startDate: Date, endDate: Date) => {
//   const ratings = await prismadb.feedback.findMany({
//     where: {
//       consultation: {
//         date: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//     },
//     select: {
//       rating: true,
//     },
//   });
  
//   if (ratings.length === 0) return null;
//   return ratings.reduce((sum, { rating }) => sum + rating, 0) / ratings.length;
// };

// Main function to calculate metrics
export const calculateExpertMetrics = async (startDate: Date, endDate: Date) => {
  const totalRevenue = await calculateTotalRevenue(startDate, endDate);
  const commissionRate = 10; // Example commission rate, replace with actual rate
  const totalConsultations = await calculateTotalConsultations(startDate, endDate);
  const averageConsultationFee = calculateAverageConsultationFee(totalRevenue, totalConsultations);
  const commission = calculateCommission(totalRevenue, commissionRate);
  const netRevenue = totalRevenue - commission;
//   const averageRating = await calculateAverageRating(startDate, endDate);

  return {
    totalRevenue,
    totalConsultations,
    averageConsultationFee,
    commission,
    netRevenue,
    // averageRating,
  };
};
