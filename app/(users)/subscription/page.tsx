"use client";
import { useRouter} from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useSubscription from "@/hooks/use-subscription";
import { motion } from "framer-motion";
import { format, isToday } from "date-fns";
import SubscriptionPlans from "@/components/SubscriptionPlans";
interface Subscription {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  plan: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  paymentAmount: number;
  paymentId: string;
}
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const SubscriptionPage = (props:{searchParams:SearchParams}) => {
  const searchParams = use(props.searchParams);
  const{data,status,transaction_id}= searchParams;
  const router = useRouter();
  const subscriptionStore = useSubscription();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const storedSubscription = subscriptionStore.subscription;
  console.log(subscription)
  console.log(storedSubscription?.plan)
  useEffect(() => {
    async function fetchSubscription() {
      try {
        const response = await axios.get("api/subscription");
        if (response.data.success) {
          setSubscription(response.data.subscription);
        }
      } catch (error) {
        console.error('Error Making GET request to subscription',error)
        toast.error("something went wrong");
      }
    }
    fetchSubscription();
  }, []);
  useEffect(() => {
    const base64String = data as string;
    const decodedData = base64String
      ? Buffer.from(base64String, "base64").toString("utf-8")
      : null;
    const parsedData = decodedData ? JSON.parse(decodedData) : null;

    const paymentStatus = (status as string).toUpperCase() || parsedData?.status;
    const totalAmount = storedSubscription ? storedSubscription.price : 0;
    const transactionId =
    transaction_id || parsedData?.transaction_uuid;

    // Check if the status is 'COMPLETED'
    if (paymentStatus === "COMPLETED" || paymentStatus === "COMPLETE") {
      // Check if the request has already been made
      const hasRequested = sessionStorage.getItem("hasRequested");
      if (!hasRequested) {
        console.log(parsedData);

        //  POST request
        const postData = {
          plan: storedSubscription?.plan,
          paymentAmount: totalAmount,
          paymentId: transactionId,
        };
        axios
          .post("/api/subscription", postData)
          .then((response) => {
            if(response.data.success){
            toast.success("Request successful!");
            sessionStorage.setItem("hasRequested", "true");
            subscriptionStore.removeAll();
            router.push("/subscription");}
          })
          .catch((error) => {
            console.error("Error making POST request", error);
            toast.error("Request failed!");
          });
      }
      else {
        router.push("/subscription")
      }
    }
  }, [data, router, status, storedSubscription, subscriptionStore,transaction_id]);

  const handleRenewNow =()=>{
    alert('renew')

  }
  return (
    <>

    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Subscriptions</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {subscription ? (
            <motion.div
              className="bg-white dark:bg-black shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-baseline justify-between">
                Plan <span className="text-sm text-blue-600">{subscription.plan}</span>
              </div>
              <div className="flex items-baseline justify-between">
                status <span className="text-sm text-blue-600">{subscription.status}</span>
              </div>
              <div className="flex items-baseline justify-between">
                Active Since <span className="text-sm text-blue-600">{format(new Date(subscription.createdAt),'PP')}</span>
              </div>
              {isToday(new Date(subscription.endDate)) ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRenewNow()}
                  className="mt-4 w-full bg-blue-500 text-white dark:text-blackpy-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Renew now
                </motion.button>
              ) : (
                <p className="mt-4 text-gray-500 text-center">
                  Expire on {format(new Date(subscription.endDate), "PPP")}
                </p>
              )}
            </motion.div>
          ) : (
            <div>
            <p className="text-center text-gray-500">
              You haven&apos;t subscribed yet
            </p>

              <SubscriptionPlans />
              </div>
          )}
        </div>
      </div>
    </div>
   
    </>
  );
};
export default SubscriptionPage;
