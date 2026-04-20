import './layout.css';
import '../shared/shared.css';
import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

export interface ShellProps {
  children: ReactNode;
  tab: string;
  onTab: (id: string) => void;
  focusMode?: boolean;
  darkMode?: boolean;
  onToggleDark?: () => void;
}

export function Shell({ children, tab, onTab, focusMode = false, darkMode = false, onToggleDark }: ShellProps) {
  return (
    <div
      className={`app ${focusMode ? 'focus-mode' : ''}`}
      data-theme={darkMode ? 'dark' : undefined}
      style={{ colorScheme: darkMode ? 'dark' : 'light', transition: 'background 300ms, color 300ms' }}
    >
      <Sidebar tab={tab} onTab={onTab} darkMode={darkMode} onToggleDark={onToggleDark} />
      <main className="main" style={{ position: 'relative' }}>
        {children}
      </main>
    </div>
  );
}
