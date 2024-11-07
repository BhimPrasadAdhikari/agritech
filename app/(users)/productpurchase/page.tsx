// "use client";

// import { useEffect, useState } from 'react';
// import Container from '@/components/ui/container';
// import { useSearchParams } from 'next/navigation';
// import toast from 'react-hot-toast';
// import { useUser } from '@clerk/nextjs';
// import OrderList from './components/order-list';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import OrderPageSkeleton from '../orders/components/LoadingSkeleton';
// import { Order } from '@/types';
// import getOrders from '@/actions/get-orders';
// export const revalidate = 0;
// const OrderPage = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const { user } = useUser(); // Check the user state
//   const email =user?.primaryEmailAddress?.emailAddress
//   const [paymentStatus, setPaymentStatus] = useState("Pending");
//   const searchParams = useSearchParams();
//   const [orders,setOrders] = useState<Order[]>([]);
//   useEffect(() => {
//           async function fetchOrders () {
//             if(email){
//             const res = await getOrders({email:email})
//             setOrders(res)
//           }
//           }
//       fetchOrders();
//     const status = searchParams?.get('status');
//     if (status) {
//       if (status.toLowerCase() === 'completed') {
//         toast.success('Payment completed.');
//         setPaymentStatus("Completed");
//       } else if (status === 'User cancelled') {
//         toast.error('Cancelled Payment');
//         setPaymentStatus("Abandoned");
//       } else if (status === 'Expired') {
//         toast.error('Transaction Expired');
//       } else if (status === 'Refunded') {
//         toast.error('Payment Refunded');
//         setPaymentStatus("Refunded");
//       }
//     }
//     setTimeout(() => setIsLoading(false), 1500); // Simulating a delay for demo purposes
//   }, [searchParams,email]);

//   const handleTabChange = (value: string) => {
//     setPaymentStatus(value);
//   };

//   if (isLoading || !user) {
//     return <OrderPageSkeleton />; // Render the loading skeleton or redirect if not signed in
//   }

//   return (
//     <div className="bg-white dark:bg-black min-h-screen">
//       <Container>
//         <div className="px-4 py-16 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold text-black dark:text-white mb-6">Orders</h1>
//           {email ? ( // Render OrderList only when email is available
//             <div>
//               <Tabs value={paymentStatus} onValueChange={handleTabChange} className="w-full">
//                 <TabsList className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
//                   <TabsTrigger value="Completed" className="flex-1 text-center py-2">
//                     Completed
//                   </TabsTrigger>
//                   <TabsTrigger value="Pending" className="flex-1 text-center py-2">
//                     Pending
//                   </TabsTrigger>
//                   <TabsTrigger value="Abandoned" className="flex-1 text-center py-2">
//                     Abandoned
//                   </TabsTrigger>
//                   <TabsTrigger value="Refunded" className="flex-1 text-center py-2">
//                     Refunded
//                   </TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="Completed">
//                   <OrderList orders={orders} paymentStatus={paymentStatus}/>
//                 </TabsContent>
//                 <TabsContent value="Pending">
//                   <OrderList orders={orders} paymentStatus={paymentStatus}/>
//                 </TabsContent>
//                 <TabsContent value="Abandoned" >
//                   <OrderList orders={orders} paymentStatus={paymentStatus} />
//                 </TabsContent>
//                 <TabsContent value="Refunded">
//                   <OrderList orders={orders} paymentStatus={paymentStatus}/>
//                 </TabsContent>
//               </Tabs>
//             </div>
//           ) : (
//             <p className="text-neutral-500">Loading user data...</p> // Handle case when email is not set yet
//           )}
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default OrderPage;





"use client";

import { useEffect, useState } from 'react';
import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';
import Summary from './components/summary';
import CartItem from './components/cart-item';

export const revalidate = 0;

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-black">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black mb-6 dark:text-white">Payment</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12 gap-y-8">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && <p className="text-neutral-500">No items added to cart.</p>}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <Summary summaryData={cart.items} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
