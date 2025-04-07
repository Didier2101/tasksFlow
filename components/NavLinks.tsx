"use client";

import { FolderDot, Home, UsersRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

const links = [
  { href: "/admin/inicio", text: "Inicio", icon: Home },
  { href: "/admin/proyectos", text: "Proyectos", icon: FolderDot },
  { href: "/admin/colaboradores", text: "Colaboradores", icon: UsersRound },
  { href: "/admin/tareas", text: "Tareas", icon: UsersRound },
  { href: "/admin/ideas", text: "Nuevas Ideas", icon: UsersRound },
];

const NavLinks = ({ expanded = true }) => {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={twMerge(
              "flex h-[40px] items-center rounded-md px-2 mb-1 text-sm font-semibold hover:bg-slate-700 transition-all duration-200 ease-in-out relative",
              expanded ? "justify-start" : "justify-center",
              isActive && "bg-slate-800"
            )}
            title={!expanded ? link.text : ""}
          >
            <div className={`flex items-center ${expanded ? "gap-2" : ""}`}>
              <LinkIcon className="w-6 text-cyan-400" strokeWidth={1.5} />

              {expanded && (
                <p className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {link.text}
                </p>
              )}

              {expanded && isActive && (
                <span
                  className={`${
                    expanded ? "absolute right-2" : "absolute top-1 right-1"
                  } w-2 h-2 rounded-full bg-cyan-400`}
                ></span>
              )}
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
