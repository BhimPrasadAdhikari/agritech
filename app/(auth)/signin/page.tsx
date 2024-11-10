// app/signin/page.tsx

"use client";

import AuthForm from "../components/AuthForm";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Dialog } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignInPage = () => {
  const session = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (session?.status === "authenticated") {
      window.location.href = "/";
      setOpen(false);
    }
    router.push("/signin");
  }, [session?.status, router]);

  return (
    <>
      <Header />
      <Layout>
        <Dialog
          open={open}
          onClose={() => {}}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 "
        >
          <AuthForm />
        </Dialog>
      </Layout>
      <Footer />
    </>
  );
};

export default SignInPage;
