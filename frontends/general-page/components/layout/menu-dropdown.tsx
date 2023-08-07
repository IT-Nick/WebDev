import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { LayoutDashboard, LogOut } from "lucide-react";
import Popover from "@/components/shared/popover";
import Image from "next/image";
import { motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import Link from "next/link";
import { useSignInModal } from "./sign-in-modal";

export default function MenuDropdown() {
  const [openPopover, setOpenPopover] = useState(false);

  const { SignInModal, setShowSignInModal } = useSignInModal();

  function Open() {
    setOpenPopover(false);
    setShowSignInModal(true);
  }

  return (
    <motion.div
      className="relative inline-block text-left"
      {...FADE_IN_ANIMATION_SETTINGS}
    >
      <SignInModal />
      <Popover
        content={
          <div className="w-full rounded-md bg-white p-2 sm:w-56">
            <Link
              className="flex items-center justify-start space-x-2 relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              href="/events"
            >
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm">Мероприятия</p>
            </Link>
            <button
              className="flex items-center justify-start space-x-2 relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              disabled
            >
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm text-red-600">Мое пространство</p>
            </button>
            <button
              className="flex items-center justify-start space-x-2 relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              disabled
            >
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm text-red-600">Стажировки</p>
            </button>
            <motion.button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => Open()}
              {...FADE_IN_ANIMATION_SETTINGS}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-sm">Войти</p>
            </motion.button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-8 w-8 items-center justify-center overflow-hidden transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
          {/* ИКОНОЧКА */}
          <Image
            alt={"menu"}
            src={`menu.svg`}
            width={40}
            height={40}
            className="hover:animate-pulse"
          />
        </button>
      </Popover>
    </motion.div>
  );
}
