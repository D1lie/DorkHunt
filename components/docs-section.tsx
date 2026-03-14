import { ReactNode } from "react";
import { Link2 } from "lucide-react";

interface DocsSectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function DocsSection({ id, title, children }: DocsSectionProps) {
  return (
    <section id={id} className="scroll-mt-20 mb-16">
      <div className="group relative">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-green-400">#</span>
          {title}
          <a
            href={`#${id}`}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Link2 className="w-5 h-5 text-green-400/50 hover:text-green-400" />
          </a>
        </h2>
      </div>
      <div className="space-y-4 text-gray-300 leading-relaxed">{children}</div>
    </section>
  );
}
