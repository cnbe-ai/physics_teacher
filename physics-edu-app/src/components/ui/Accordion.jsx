import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function Accordion({ title, children, defaultOpen = false, icon = null, titleClass = '' }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-xl">{icon}</span>}
          <span className={`font-semibold text-slate-800 ${titleClass}`}>{title}</span>
        </div>
        <ChevronDown
          size={18}
          className={`text-slate-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="accordion-content border-t border-slate-100 bg-slate-50 p-4">
          {children}
        </div>
      )}
    </div>
  );
}
