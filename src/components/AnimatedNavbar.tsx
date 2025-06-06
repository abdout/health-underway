"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const navItems = [
  { path: "/", name: "Home" },
  { path: "/lovable", name: "Lovable" },
  { path: "/about", name: "About" },
  { path: "/contact", name: "Contact" },
];

export default function AnimatedNavbar() {
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const tabsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const setTabPosition = (index: number) => {
    const currentTab = tabsRef.current[index];
    if (currentTab) {
      setTabUnderlineLeft(currentTab.offsetLeft);
      setTabUnderlineWidth(currentTab.offsetWidth);
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="border border-gray-200 p-2 rounded-xl bg-white/80 backdrop-blur-md shadow-lg">
        <div 
          className="flex gap-2 relative"
          onMouseLeave={() => setHoveredTab(null)}
        >
          {/* Animated background */}
          <span
            className="absolute top-0 flex rounded-lg bg-gray-100 transition-all duration-300 ease-out"
            style={{
              left: hoveredTab !== null ? tabUnderlineLeft : 0,
              width: hoveredTab !== null ? tabUnderlineWidth : 0,
              height: "100%",
              opacity: hoveredTab !== null ? 1 : 0,
            }}
          />
          
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              ref={(el) => (tabsRef.current[index] = el)}
              className="px-4 py-2 rounded-lg text-sm font-medium relative z-10 transition-colors duration-200 text-gray-600 hover:text-gray-900"
              href={item.path}
              onMouseEnter={() => {
                setHoveredTab(index);
                setTabPosition(index);
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 