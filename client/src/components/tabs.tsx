import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  key: string;
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export default function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].key);

  return (
    <div className="rounded-md border border-gray-200 overflow-hidden">
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={cn(
              "px-3 py-1 text-gray-600",
              activeTab === tab.key && "font-medium text-primary border-b-2 border-primary"
            )}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="p-4 bg-white">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={cn(activeTab === tab.key ? "block" : "hidden")}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
