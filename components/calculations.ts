import prismadb from "@/lib/prismadb"; // Adjust this import based on your project structure

// Get total revenue for a store
const calculateTotalRevenue = async (startDate: Date, endDate: Date) => {
  const orders = await prismadb.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  let totalRevenue = 0;
  orders.forEach(order => {
    order.orderItems.forEach(item => {
      totalRevenue += item.quantity * (item.product?.price || 0);
    });
  });

  return totalRevenue;
};

// Get total number of orders
const getTotalOrders = async (startDate: Date, endDate: Date) => {
  return await prismadb.order.count({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });
};

// Get unique customers
const getUniqueCustomers = async (startDate: Date, endDate: Date) => {
  const orders = await prismadb.order.findMany({
    where: {
      isPaid:true,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      email: true,
    },
  });

  const uniqueCustomers = new Set(orders.map(order => order.email));
  return uniqueCustomers.size;
};

// Calculate average order value
const calculateAOV = (totalRevenue: number, totalOrders: number) => {
  return totalOrders > 0 ? totalRevenue / totalOrders : 0;
};
// Get product performance
// Get product performance
const getProductPerformance = async (startDate: Date, endDate: Date) => {
  const productPerformance = await prismadb.orderItem.groupBy({
    by: ['productId'],
    _sum: {
      quantity: true,
    },
    where: {
      order: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    },
  });

  // Filter out null product IDs and create an array of unique product IDs
  const productIds = productPerformance
    .map(item => item.productId)
    .filter((id): id is string => id !== null); // Ensure we only have string IDs

  // Fetch products based on the collected product IDs
  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    select: {
      id: true,
      name: true, // Ensure we're selecting the name
    },
  });

  // Map product performance to the desired format
  return productPerformance.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      name: product?.name || "Unknown Product", // Default name if not found
      sales: item._sum.quantity || 0, // Ensure sales are a number
    };
  });
};


// Calculate return rate
const calculateReturnRate = async (startDate: Date, endDate: Date) => {
  const totalOrders = await getTotalOrders(startDate, endDate);
  const returnedOrders = await prismadb.order.count({
    where: {
      isPaid: true,
      // Assuming there's a field indicating returns
      paymentStatus: 'returned',
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  return totalOrders > 0 ? (returnedOrders / totalOrders) * 100 : 0;
};

// Get sales by category
const getSalesByCategory = async (startDate: Date, endDate: Date) => {
  // Get sales grouped by productId
  const salesData = await prismadb.orderItem.groupBy({
    by: ['productId'],
    _sum: {
      quantity: true,
    },
    where: {
      order: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    },
  });

  // Fetch product categories based on the productIds
  const productIds = salesData.map(item => item.productId).filter((id): id is string => id !== null);

  const products = await prismadb.product.findMany({
    where: {
      id: { in: productIds },
    },
    select: {
      id: true,
      category: true, // Adjust this based on your actual category field in the product
    },
  });

  // Aggregate sales data by category
  const salesByCategory: { categoryName: string; sales: number }[] = [];

  salesData.forEach(sale => {
    const product = products.find(p => p.id === sale.productId);
    const categoryName = product?.category.name || "Unknown Category"; // Default category if not found

    // Check if category already exists in the salesByCategory array
    const existingCategory = salesByCategory.find(cat => cat.categoryName === categoryName);

    if (existingCategory) {
      existingCategory.sales += sale._sum.quantity || 0; // Add to existing sales
    } else {
      // Create a new entry if category doesn't exist
      salesByCategory.push({
        categoryName: categoryName,
        sales: sale._sum.quantity || 0,
      });
    }
  });

  return salesByCategory;
};

// Main metrics calculation function
export const calculateMetrics = async (startDate: Date, endDate: Date) => {
  const totalRevenue = await calculateTotalRevenue(startDate, endDate);
  const totalOrders = await getTotalOrders(startDate, endDate);
  const uniqueCustomers = await getUniqueCustomers(startDate, endDate);
  const aov = calculateAOV(totalRevenue, totalOrders);
  const productPerformance = await getProductPerformance(startDate, endDate);
  const returnRate = await calculateReturnRate(startDate, endDate);
  const salesByCategory = await getSalesByCategory(startDate, endDate);
  return {
    totalRevenue,
    totalOrders,
    aov,
    uniqueCustomers,
    productPerformance,
    returnRate,
    salesByCategory,
  };
};