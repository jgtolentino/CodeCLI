import React from "react";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileHeaderProps {
  toggleSidebar: () => void;
}

export default function MobileHeader({ toggleSidebar }: MobileHeaderProps) {
  return (
    <header className="lg:hidden bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center space-x-3">
          <img 
            src="https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&w=40&h=40" 
            alt="Codex Logo" 
            className="h-8 w-8" 
          />
          <span className="font-semibold text-xl">Codex</span>
        </div>
        <Button 
          onClick={toggleSidebar}
          variant="ghost" 
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
