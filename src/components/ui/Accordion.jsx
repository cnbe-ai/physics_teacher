import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function Accordion({ title, children, defaultOpen = false, icon = null }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        border: '1.5px solid #e2e8f0',
        borderRadius: '0.875rem',
        overflow: 'hidden',
        marginBottom: '0.75rem',
        boxShadow: open ? '0 4px 12px rgba(0,0,0,0.06)' : '0 1px 3px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.2s',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.125rem 1.25rem',
          backgroundColor: open ? '#f0f7ff' : '#ffffff',
          borderBottom: open ? '1.5px solid #dbeafe' : 'none',
          textAlign: 'left',
          transition: 'background-color 0.15s',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
          {icon && <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{icon}</span>}
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: '1rem',
            color: open ? '#1a3a6b' : '#1e293b',
            lineHeight: 1.5,
          }}>
            {title}
          </span>
        </div>
        <ChevronDown
          size={20}
          style={{
            color: '#64748b',
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        />
      </button>

      {open && (
        <div
          className="accordion-content"
          style={{
            backgroundColor: '#fafbff',
            padding: '1.25rem 1.5rem',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
