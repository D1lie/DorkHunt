import { ReactNode } from "react";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocsCalloutProps {
  type: "note" | "tip" | "warning";
  children: ReactNode;
}

export function DocsCallout({ type, children }: DocsCalloutProps) {
  const config = {
    note: {
      icon: Info,
      bg: "bg-blue-500/5",
      border: "border-blue-500/30",
      iconColor: "text-blue-400",
      title: "Note",
    },
    tip: {
      icon: Lightbulb,
      bg: "bg-green-500/5",
      border: "border-green-500/30",
      iconColor: "text-green-400",
      title: "Tip",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-yellow-500/5",
      border: "border-yellow-500/30",
      iconColor: "text-yellow-400",
      title: "Warning",
    },
  };

  const { icon: Icon, bg, border, iconColor, title } = config[type];

  return (
    <div
      className={cn(
        "rounded-lg p-4 border backdrop-blur-sm",
        bg,
        border
      )}
    >
      <div className="flex gap-3">
        <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", iconColor)} />
        <div className="flex-1">
          <div className={cn("font-semibold mb-1", iconColor)}>{title}</div>
          <div className="text-sm text-gray-300 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
