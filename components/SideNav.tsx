"use client";

import Link from "next/link";
import NavLinks from "./NavLinks";
import Logo from "@/src/ui/Logo";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";

const SideNav = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`flex h-full  flex-col p-4 transition-all duration-300 ease-in-out  ${
        expanded ? " w-64" : "px-2 w-auto"
      }`}
    >
      <div
        className={`mb-4 flex items-center justify-between   ${
          expanded ? "" : "justify-center"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center hover:bg-slate-700 p-2 rounded-full transition-all duration-300 ease-in-out"
        >
          <Menu className="w-6 text-cyan-400" strokeWidth={1.5} />
        </button>
        <Link
          href="#"
          className={`${
            expanded ? "block" : "hidden"
          } transition-all duration-300`}
        >
          <Logo />
        </Link>
      </div>
      <NavLinks expanded={expanded} />
      <div className="hidden h-auto w-full grow md:block"></div>
      <button
        onClick={() => alert("salendo")}
        className="border border-slate-700 flex gap-2 h-[40px] items-center rounded-md px-2 mb-1 text-sm font-semibold hover:bg-slate-800 transition-all duration-200 ease-in-out"
      >
        <LogOut className="w-5 text-cyan-400" strokeWidth={1.5} />
        {expanded && (
          <p className="font-bold text-md bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Salir
          </p>
        )}
      </button>
      {expanded && (
        <p className=" text-[10px] mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          2025 !BUG. Todos los derechos reservados.
        </p>
      )}
    </div>
  );
};

export default SideNav;
