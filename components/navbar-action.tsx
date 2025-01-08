"use client";
import qs from "query-string";
import { useEffect, useState } from "react";
// import { ModeToggle } from "./ui/mode-toggle";
import usePlantationModel from "@/hooks/use-plantation-model";
import useSubscriptionModel from "@/hooks/use-subscription-model";
import { signIn, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaHeart,
  FaMicroscope,
  FaShoppingBasket,
  FaStore,
  FaUserMd,
} from "react-icons/fa";
import { FcAlarmClock } from "react-icons/fc";
import UserProfileIcon from "./UserProfileIcon";
import { useRouter } from "next/navigation";
import axios from "axios";
import useExpertChatModel from "@/hooks/use-expertchat-model";
import { Button } from "./ui/Button";
import useCart from "@/hooks/use-cart";
import useWish from "@/hooks/use-wish";
import { ModeToggle } from "./ui/mode-toggle";
const NavbarActions = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const PlantationModel = usePlantationModel();
  const SubscriptionModel = useSubscriptionModel();
  const ExpertChatModal = useExpertChatModel();
  const cart= useCart();
  const wish = useWish();
  const session = useSession();
  const [hovered, setHovered] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const handleChatWithExpert=async()=>{
    const response = await axios.get('/api/consult');
    console.log(response)
    if(response.data.success){
      const expert = response.data.consultations[0].expert
      // console.log(consultation);
      ExpertChatModal.setExpertName(expert.name);
      ExpertChatModal.setExpertProfile(expert.image.url)
      ExpertChatModal.onOpen()
    }else{
      console.log("no-")
    }
  }
  const handleSchedule = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/subscription');
      console.log(response);
      if (response.data.success) {
        const subscription = response.data.subscription;
        const plan = subscription.plan.toLowerCase();
        if (plan === "basic" || plan === "pro" || plan === "premium") {
          PlantationModel.onOpen();
        } else {
          SubscriptionModel.onOpen();
        }
      }else {
        SubscriptionModel.onOpen();
      }
    } catch (error) {
      console.error("FETCH_SUBSCRIPTION_ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
   <div className="ml-auto flex items-center relative gap-1">
      <div className="relative flex items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-yellow-600 text-white      p-1 rounded-full shadow-lg focus:outline-none"
          onClick={() => router.push("/predict")}
          onMouseEnter={() => setHovered("detect")}
          onMouseLeave={() => setHovered(null)}
        >
          <FaMicroscope />
        </motion.button>
        {hovered === "detect" && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute z-50  top-full mb-2 bg-gray-800 text-white  text-xs p-2 rounded-md shadow-lg"
          >
            Detect Disease
          </motion.span>
        )}
      </div>
      <div className="relative flex items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-green-600 text-white      p-1 rounded-full shadow-lg focus:outline-none"
          onClick={() => router.push('/appointments')}
          onMouseEnter={() => setHovered("appointment")}
          onMouseLeave={() => setHovered(null)}
        >
          <FaCalendarAlt className="" />
        </motion.button>
        {hovered === "appointment" && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute z-50  top-full mb-2 bg-gray-800 text-white     text-xs p-2 rounded-md shadow-lg"
          >
            Take Appointment
          </motion.span>
        )}
      </div>
      {/* Chat with Expert Button */}
      <div className="relative flex items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-blue-600 text-white      p-1 rounded-full shadow-lg focus:outline-none"
          onClick={handleChatWithExpert}
          onMouseEnter={() => setHovered("chatexpert")}
          onMouseLeave={() => setHovered(null)}
        >
          <FaUserMd className="" />
        </motion.button>
        {hovered === "chatexpert" && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute z-50  top-full mb-2 bg-gray-800 text-white     text-xs p-2 rounded-md shadow-lg"
          >
            chat with expert
          </motion.span>
        )}
      </div>
      <div className="relative flex items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          disabled={loading}
          whileTap={{ scale: 0.9 }}
          className="bg-amber-500      p-1 rounded-full shadow-lg focus:outline-none disabled:cursor-not-allowed"
          onClick={handleSchedule}
          onMouseEnter={() => setHovered("addcrop")}
          onMouseLeave={() => setHovered(null)}
        >
          <FcAlarmClock />
        </motion.button>
        {hovered === "addcrop" && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute z-50  top-full mb-2 bg-gray-800 text-white     text-xs p-2 rounded-md shadow-lg"
          >
            add crop reminder
          </motion.span>
        )}
      </div>


      {/* Wishlist Button */}
      <ModeToggle/>
      <div className="relative flex items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-yellow-600 text-white  p-1 rounded-full shadow-lg focus:outline-none"
          onClick={() => window.location.href="/store"}
          onMouseEnter={() => setHovered("shop")}
          onMouseLeave={() => setHovered(null)}
        >
          <FaStore />
        </motion.button>
        {hovered === "shop" && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute z-50  top-full mb-2 bg-gray-800 text-white      text-xs p-2 rounded-md shadow-lg"
          >
            Shop Now
          </motion.span>
        )}
      </div>
      <div className="relative">
      <motion.button
          onClick={() => router.push("/store/wishlist")}
          className="bg-black flex items-center p-1 rounded-full shadow-lg focus:outline-none disabled:cursor-not-allowed"
        >
          <FaHeart color="red" />
        </motion.button>
        {wish.items.length > 0 && (
          <span className="absolute top-[-8px] right-[-2px] bg-red-500 text-white      text-xs font-bold rounded-full px-1.5">
            {wish.items.length}
          </span>
        )}
      </div>

      {/* Cart Button */}
      <div className="relative">
        <motion.button
          onClick={() => router.push("/store/cart")}
          className="bg-black flex items-center p-1 rounded-full shadow-lg focus:outline-none disabled:cursor-not-allowed"
        >
          <FaShoppingBasket color="yellow" />
        </motion.button>
        {cart.items.length > 0 && (
          <span className="absolute top-[-8px] right-[-2px] bg-red-500 text-white      text-xs font-bold rounded-full px-1.5">
            {cart.items.length}
          </span>
        )}
      </div>
      {/* User Button */}

      {session?.status === "authenticated" ? <UserProfileIcon />:
      <div className="flex">
      <Button onClick={()=>router.push('/signin')}>Log In</Button>
      <Button className='bg-green-500' onClick={()=>router.push('/signin')}>Sign Up</Button>

      </div>
      }

    </div>
    </>
  );
};

export default NavbarActions;
