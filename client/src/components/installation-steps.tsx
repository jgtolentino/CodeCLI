import React from "react";
import CodeBlock from "@/components/ui/code-block";

interface Step {
  number: number;
  title: string;
  description: string;
  code?: string;
}

interface InstallationStepsProps {
  steps: Step[];
}

export default function InstallationSteps({ steps }: InstallationStepsProps) {
  return (
    <div className="space-y-4">
      {steps.map((step) => (
        <div key={step.number} className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
              {step.number}
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium">{step.title}</h3>
            <p className="text-gray-600 mt-1">{step.description}</p>
            {step.code && <CodeBlock code={step.code} />}
          </div>
        </div>
      ))}
    </div>
  );
}
