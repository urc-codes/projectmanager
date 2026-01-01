"use client";
import { X, LogOut, LayoutDashboard, UserPlus, FileStack } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}


const sidebarLinks: SidebarLink[] = [
  { label: "Overview", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { label: "Team", href: "/team", icon: <UserPlus size={18} /> },
  { label: "Proposal", href: "/proposal", icon: <FileStack size={18} /> },
];


const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-20 lg:hidden" onClick={toggleSidebar} />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-30 w-72 bg-white border-r border-neutral-200/10 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col h-full shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] lg:shadow-none`}
      >
        <div className="h-16 flex items-center px-8 ">
          <div className="flex items-center gap-3">
            <Image
              src="/uenrlogo.png"
              alt="logo"
              width={20}
              height={20}
              priority
            />
            <span className="font-light text-xl tracking-tight text-neutral-900">
              Student Portal
            </span>
          </div>

          <button
            onClick={toggleSidebar}
            className="ml-auto lg:hidden text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto text-sm">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center px-4 py-2.5 text-neutral-600 rounded-lg hover:bg-neutral-50 hover:text-neutral-900 group transition-all duration-200"
            >
              <span className="mr-3 text-neutral-400 group-hover:text-neutral-600">
                {link.icon}
              </span>
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-neutral-100/60">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2.5 text-neutral-500 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
          >
            <LogOut size={18} className="mr-3 group-hover:text-red-600" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
