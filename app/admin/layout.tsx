import SideNav from "@/components/SideNav";
import { FC, PropsWithChildren } from "react";

const AdminLayout: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <div className="flex h-screen flex-row overflow-hidden">
      <aside className="bg-gradient-to-bl from-slate-900 to-slate-800 border-r border-slate-700/50">
        <SideNav />
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AdminLayout;
