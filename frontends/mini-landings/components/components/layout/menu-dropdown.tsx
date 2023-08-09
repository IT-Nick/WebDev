import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
    >
      <SignInModal />
    </motion.div>
  );
}
