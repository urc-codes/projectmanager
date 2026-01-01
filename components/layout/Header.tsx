import { Menu } from "lucide-react";
import ProfileDropdown from "@/components/account/ProfileDropdown";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => (
  <header className="h-16 bg-white/80 backdrop-blur-md border-b flex items-center px-8 sticky top-0 z-10">
    <div className="flex items-center gap-4">
      <button
        onClick={toggleSidebar}
        className="p-2 -ml-2 text-neutral-500 rounded-lg lg:hidden hover:bg-neutral-100 transition-colors"
      >
        <Menu size={20} />
      </button>
      <p className="text-neutral-700 font-light text-sm">
        Team: <span className="font-medium text-neutral-900">AI 3D Model</span>
      </p>
    </div>
    <div className="ml-auto flex items-center gap-4">
      <ProfileDropdown />
    </div>
  </header>
);

export default Header;
