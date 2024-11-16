"use client";

import { useEffect, useState } from "react";
import { X, Menu, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCurrentLocale } from "@locales/client";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

export default function BigMenu() {
  const [open, setOpen] = useState(true);
  const [hoverItem, setHoverItem] = useState("");
  const items: string[] = ["Features", "Books", "About Us"];
  const locale = useCurrentLocale();
  const router = useRouter();

  const motionWidth = useMotionValue(90);
  const motionHeight = useMotionValue(90);

  const width = useSpring(motionWidth, { stiffness: 300, damping: 30 });
  const height = useSpring(motionHeight, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (open) {
      motionWidth.set(400);
      motionHeight.set(500);
    } else {
      motionWidth.set(90);
      motionHeight.set(90);
    }
  }, [open]);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const onItemMouseEnter = (item: string) => {
    setHoverItem(item);
  };

  const onItemMouseLeave = () => {
    setHoverItem("");
  };

  const onItemClick = (item: string) => {
    const route = `/${locale}/${item.toLowerCase().replace(" ", "-")}`;
    router.push(route);
  };

  return (
    <motion.div
      className="floating-menu flex flex-col bg-green-yellow-500 rounded-3xl py-8 px-8"
      style={{
        width,
        height,
      }}
    >
      <div className="flex flex-row w-full justify-end">
        <button onClick={toggleOpen} className="text-slate-900">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="flex flex-col w-full mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", duration: 0.2, bounce: 0.05 }}
          >
            {items.map((item, index) => (
              <button
                key={item}
                className="flex flex-row py-4 items-center justify-start"
                onMouseEnter={() => onItemMouseEnter(item)}
                onMouseLeave={onItemMouseLeave}
                onClick={() => onItemClick(item)}
              >
                {hoverItem === item && (
                  <motion.div
                    className="flex flex-row mr-[2rem]"
                    layout
                    layoutId="move-right-icon"
                  >
                    <MoveRight size={33} className="text-slate-900" />
                  </motion.div>
                )}
                <motion.span
                  className="font-sans text-3xl text-slate-900"
                  layout
                  layoutId={`item-${index}`}
                  style={{
                    fontWeight: "200",
                  }}
                >
                  {item}
                </motion.span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
