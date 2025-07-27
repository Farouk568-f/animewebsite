import React from 'react';
import { motion } from 'framer-motion';

interface ToggleSwitchProps {
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
    label: string;
    description?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, setEnabled, label, description }) => {
    return (
        <div className="flex items-center justify-between">
          <div>
            <label className="font-semibold text-slate-200 cursor-pointer" onClick={() => setEnabled(!enabled)}>
              {label}
            </label>
            {description && (
              <p className="text-sm text-slate-500 max-w-sm">{description}</p>
            )}
          </div>
          <button
              onClick={() => setEnabled(!enabled)}
              className={`relative flex items-center h-7 w-12 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-color)] focus-visible:ring-[color:var(--color-primary)] ${
                  enabled ? 'bg-[color:var(--color-primary)]' : 'bg-slate-700'
              }`}
          >
              <motion.span
                  layout
                  transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ${
                      enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
              />
          </button>
        </div>
    );
};

export default ToggleSwitch;