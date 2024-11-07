/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from 'axios'
import { BsFacebook, BsGoogle } from "react-icons/bs";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import AuthSocialButton from "./AuthSocialButton";
import { motion } from "framer-motion"; // Import Framer Motion
import { User, Mail, Lock } from "lucide-react"; // Import icons from Lucide React
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const formSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().min(3),
  password: z.string().min(1),
});

type AuthFormValues = z.infer<typeof formSchema>;

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
  }, []);
  const onSubmit = async (data: AuthFormValues) => {
    setIsLoading(true);
    if(variant==='REGISTER'){
    axios.post('/api/register',data).then(()=>signIn('credentials',data)).catch(()=>toast.error('Something went wrong')).finally(()=>setIsLoading(false))
  }
  if(variant==='LOGIN'){
    console.log(data)
    signIn('credentials',{
      ...data,
      redirect:false
    }).then((callBack)=>{
      if(callBack?.error){
        toast.error('Invalid Credentials')
      }
      if(!callBack?.error && callBack?.ok){
        toast.success('logged in')
        router.push('/')
      }
    }).finally(()=>setIsLoading(false))
  }
};
  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action,{redirect:false}).then((callBack)=>{
      if(callBack?.error){
        toast.error("Invalid Credentials");
      }
      if(!callBack?.error && callBack?.ok){
        toast.success('logged in')
        router.push("/")
      }
    }).finally(()=>setIsLoading(false))
  };

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      email: "",
      password: "",
    },
  });

 

  return (
      <motion.div
        className="flex items-center justify-center m-2 z-10 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="border p-5 shadow-lg rounded-md bg-white dark:bg-black z-10 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header with Typing Animation */}
          <div className="text-center mb-4">
            <motion.h1
              className="text-1xl font-bold text-green-700"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {variant === "LOGIN" ? "Sign In" : "Register"} to continue
            </motion.h1>
            <div className="typing-animation">
              <span className="app-name text-green-600 font-bold">AgriTech</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <motion.div
                key={variant} // Use variant as key to trigger animations
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {variant === "REGISTER" && (
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <User className="mr-2 text-green-600" />
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading} // Disable when loading
                            placeholder="ram"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Mail className="mr-2 text-green-600" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading} // Disable when loading
                          placeholder="example@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500"  />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Lock className="mr-2 text-green-600" />
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading} // Disable when loading
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500"  />
                    </FormItem>
                  )}
                />
                <motion.div
                  className="flex items-center justify-center my-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    variant="default"
                    className="bg-green-600 text-white dark:text-blackhover:bg-green-500"
                    disabled={isLoading} // Disable button when loading
                  >
                    {variant === "LOGIN" ? "Sign in" : "Register"}
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </Form>

          <motion.div
            className="relative flex justify-center text-sm my-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-2 text-gray-500">Or continue with</span>
          </motion.div>

          <motion.div className="flex gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
              <AuthSocialButton
                icon={BsGoogle}
                disabled={isLoading} // Disable when loading
                onClick={() => socialAction("google")}
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
              <AuthSocialButton
                icon={BsFacebook}
                disabled={isLoading} // Disable when loading
                onClick={() => socialAction("facebook")}
              />
            </motion.div>
          </motion.div>

          <motion.div className="flex items-baseline mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div>
              {variant === "LOGIN" ? "New to AgriTech?" : "Already have an account?"}
            </div>
            <Button disabled={isLoading} onClick={toggleVariant} className="underline text-blue-500 ml-2">
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
  );
};

export default AuthForm;
