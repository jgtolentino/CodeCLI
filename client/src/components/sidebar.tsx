import React from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  HomeIcon, 
  DownloadIcon, 
  ZapIcon, 
  CogIcon, 
  FolderIcon, 
  FileCodeIcon, 
  PuzzleIcon, 
  CloudIcon,
  InfoIcon
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navItems = [
  { label: "Introduction", href: "#introduction", icon: <HomeIcon className="w-5 h-5 mr-2 text-gray-500" /> },
  { label: "Installation", href: "#installation", icon: <DownloadIcon className="w-5 h-5 mr-2 text-gray-500" /> },
  { label: "Quick Start", href: "#quick-start", icon: <ZapIcon className="w-5 h-5 mr-2 text-gray-500" /> },
  { label: "Configuration", href: "#configuration", icon: <CogIcon className="w-5 h-5 mr-2 text-gray-500" /> },
  { label: "Directory Structure", href: "#directory-structure", icon: <FolderIcon className="w-5 h-5 mr-2 text-gray-500" /> },
  { label: "Templates", href: "#templates", icon: <FileCodeIcon className="w-5 h-5 mr-2 text-gray-500" /> },
  { label: "Plugins", href: "#plugins", icon: <PuzzleIcon className="w-5 h-5 mr-2 text-gray-500" /> },
  { label: "Deployment", href: "#deployment", icon: <CloudIcon className="w-5 h-5 mr-2 text-gray-500" /> },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [location] = useLocation();
  const [activeSection, setActiveSection] = React.useState("introduction");
  
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionId = section.getAttribute('id');
        
        if (sectionTop < 200 && sectionId) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 transform lg:transform-none lg:opacity-100 duration-200 ease-in-out z-10 w-64 bg-white border-r border-gray-200 overflow-y-auto lg:static lg:block",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="px-6 pt-6 pb-4 flex items-center border-b border-gray-200">
        <img 
          src="https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&w=40&h=40" 
          alt="Codex Logo" 
          className="h-8 w-8 mr-3" 
        />
        <h1 className="font-bold text-xl">Codex</h1>
      </div>
      
      <nav className="mt-5 px-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <a 
                href={item.href}
                className={cn(
                  "sidebar-link pl-4 pr-2 py-2 flex items-center text-sm font-medium rounded-md hover:bg-gray-50 hover:text-primary",
                  activeSection === item.href.substring(1) && "active border-l-2 border-blue-500 bg-blue-50 text-blue-600"
                )}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setIsOpen(false);
                  }
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-4 mt-8 border-t border-gray-200 pt-6">
        <div className="rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <InfoIcon className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Need help?</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>Check out the <a href="#" className="font-medium underline">documentation</a> or join our <a href="#" className="font-medium underline">Discord community</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
