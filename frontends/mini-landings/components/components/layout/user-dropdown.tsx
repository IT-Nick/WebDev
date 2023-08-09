import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function UserDropdown() {
  const session = true;
  const [openPopover, setOpenPopover] = useState(false);


  return (
    <motion.div
      className="relative inline-block text-left"
    >
          <div className="w-full rounded-md bg-white p-2 sm:w-56">
            <Link
              className="flex items-center justify-start space-x-2 relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              href="/dashboard"
            >
              <p className="text-sm">Панель управления</p>
            </Link>
            <Link
              className="flex items-center justify-start space-x-2 relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              href="/hub"
            >
              <p className="text-sm">Мое пространство</p>
            </Link>
            <Link
              className="flex items-center justify-start space-x-2 relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              href="/events"
            >
              <p className="text-sm">Мероприятия</p>
            </Link>
            <Link
              className="flex items-center justify-start space-x-2 relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              href="/intern"
            >
              <p className="text-sm">Стажировки</p>
            </Link>
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
            >
              <p className="text-sm">Выйти</p>
            </button>
            
          </div>
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
        </button>
    </motion.div>
  );
}
