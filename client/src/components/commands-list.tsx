import React from "react";
import CodeBlock from "@/components/ui/code-block";

interface Command {
  title: string;
  command: string;
  description: string;
}

interface CommandsListProps {
  commands: Command[];
}

export default function CommandsList({ commands }: CommandsListProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-medium mb-4">Build Commands</h3>
      <div className="space-y-4">
        {commands.map((cmd, index) => (
          <div key={index}>
            <h4 className="font-medium text-primary mb-2">{cmd.title}</h4>
            <CodeBlock code={cmd.command} />
            <p className="text-gray-600 text-sm mt-2">{cmd.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
