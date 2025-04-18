"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import SearchBar from "./search-bar";
import { ReactNode, useEffect, useState } from "react";
import Routes from "./Routes";
import {
  GraduationCap,
  Headphones,
  LandPlotIcon,
  MessageCircle,
  Pill,
  Search,
} from "lucide-react";
import Container from "./ui/container";
import NavbarActions from "./navbar-action";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";

type RouteItem = {
  name: string;
  Icon?: ReactNode;
  href: string;
};

const Header = () => {
  const { t } = useTranslation();
  const [routes, setRoutes] = useState<RouteItem[]>([]);
  const session = useSession();
  const userRole = session.data?.user.role;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  useEffect(() => {
    if (userRole !== "EXPERT" && userRole !=='ADMIN')
      setRoutes([
        { name: "field", Icon: <LandPlotIcon />, href: "/field" },
        { name: "chats", Icon: <MessageCircle />, href: "/chats" },
        { name: "experts", Icon: <GraduationCap />, href: "/experts" },
        { name: "consult", Icon: <Headphones />, href: "/consult" },
        { name: "diseases", Icon: <Pill />, href: "/diseases" },
      ]);
    if (userRole === "EXPERT")
      setRoutes([
        { name: "Dashboard", href: "/expert" },
        { name: "field", Icon: <LandPlotIcon />, href: "/field" },
        { name: "chats", Icon: <MessageCircle />, href: "/chats" },
        { name: "experts", Icon: <GraduationCap />, href: "/experts" },
        { name: "consult", Icon: <Headphones />, href: "/consult" },
        { name: "diseases", Icon: <Pill />, href: "/diseases" },
      ]);

      if(userRole==='ADMIN')
        setRoutes([
          { name: "field", Icon: <LandPlotIcon />, href: "/field" },
          { name: "chats", Icon: <MessageCircle />, href: "/chats" },
          { name: "experts", Icon: <GraduationCap />, href: "/experts" },
          { name: "consult", Icon: <Headphones />, href: "/consult" },
          { name: "diseases", Icon: <Pill />, href: "/diseases" },
          { href: `/admin`, name: 'Dashboard' }
        ]);
        
  }, [userRole]);
  return (
    <>
      <Container>
        <div className=" flex flex-shrink items-baseline justify-between h-16 px-4 sm:px-6 lg:px-8 pt-3 border-b-2 shadow-md bg-white w-full">
          <Link href="/">
            <motion.h1
              className="text-2xl font-bold mb-4 md:mb-0" // Added margin bottom for small screens
              whileHover={{ scale: 1.1, color: "#4CAF50", rotate: 5 }} // Rotate slightly on hover
              initial={{ opacity: 0, y: -20 }} // Start off-screen
              animate={{ opacity: 1, y: 0 }} // Animate to visible
              exit={{ opacity: 0, y: -20 }} // Animate out on exit
              transition={{ duration: 0.5 }} // Duration for the transition
            >
              {t("AgriTech")}
            </motion.h1>
          </Link>
          {/* Mobile menu, show/hide based on menu state */}
          <div className="lg:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Routes data={routes} />
            </div>
          </div>
          <div className="hidden lg:flex lg:items-center">
            <SearchBar />
          </div>
          <div className="lg:hidden  relative mx-1 ">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
              className="text-green-900"
            >
              <Search size={20} />
            </button>
          </div>
          {/* Main Navigation for larger screens */}
          <div className="hidden lg:flex">
            <Routes data={routes} />
          </div>
          <div>
            <LanguageSwitcher />
          </div>
          <div className="lg:flex hidden md:flex items-center space-x-4">
            <NavbarActions />
          </div>
        </div>
        <div className="flex lg:hidden md:hidden items-center justify-center">
          <div className="">
            <NavbarActions />
          </div>
        </div>
      </Container>

      <div className="flex items-center justify-center">
        {isSearchOpen && (
          <div className="flex items-center justify-center z-0 mt-2 bg-transparent text-black">
            <SearchBar />
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
