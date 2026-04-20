import React from 'react';

const Ic = ({ size = 18, className, children, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    {children}
  </svg>
);

export const IconHome     = (p: any) => <Ic {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z"/></Ic>;
export const IconEdit     = (p: any) => <Ic {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z"/></Ic>;
export const IconCal      = (p: any) => <Ic {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Ic>;
export const IconClip     = (p: any) => <Ic {...p}><rect x="4" y="4" width="16" height="18" rx="2"/><path d="M9 2h6v4H9z"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></Ic>;
export const IconMoon     = (p: any) => <Ic {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></Ic>;
export const IconSignOut  = (p: any) => <Ic {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></Ic>;
export const IconChev     = (p: any) => <Ic {...p}><polyline points="6 9 12 15 18 9"/></Ic>;
export const IconCheck    = (p: any) => <Ic {...p}><polyline points="20 6 9 17 4 12"/></Ic>;
export const IconPlus     = (p: any) => <Ic {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Ic>;

export function BrandMark({ size = 36 }: { size?: number }) {
  return (
    <img src="/assets/logo.png" width={size} height={size} alt="Dopamine Coach" style={{display:'block'}}/>
  );
}

export function Wordmark() {
  return (
    <div className="sidebar-brand">
      <BrandMark size={36} />
      <div className="sidebar-brand-text">
        <span className="sidebar-brand-name">Dopamine</span>
        <span className="sidebar-brand-sub">Coach</span>
      </div>
    </div>
  );
}

export function Sparkle() {
  return (
    <svg className="sparkle" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16 2 L18.5 13.5 L30 16 L18.5 18.5 L16 30 L13.5 18.5 L2 16 L13.5 13.5 Z"/>
    </svg>
  );
}

export function Hourglass() {
  return (
    <svg className="hourglass-wrap" viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="hg-top-clip"><path d="M20 12 L100 12 L100 28 Q100 52 60 84 Q20 52 20 28 Z"/></clipPath>
        <clipPath id="hg-bot-clip"><path d="M20 168 L100 168 L100 152 Q100 128 60 96 Q20 128 20 152 Z"/></clipPath>
      </defs>
      <path d="M18 10 L102 10 M18 170 L102 170
               M22 10 L22 30 Q22 54 60 86 Q22 118 22 152 L22 170
               M98 10 L98 30 Q98 54 60 86 Q98 118 98 152 L98 170"
            fill="none" stroke="#00B2AC" strokeWidth="1.5" strokeLinecap="round"/>
      <g clipPath="url(#hg-top-clip)">
        <rect className="hg-top-sand" x="0" y="12" width="120" height="74" fill="#00908B"/>
      </g>
      <rect className="hg-stream" x="59" y="82" width="2" height="18" fill="#00908B"/>
      <g clipPath="url(#hg-bot-clip)">
        <path className="hg-bottom-sand" d="M25 168 Q60 132 95 168 L95 170 L25 170 Z" fill="#00908B"/>
      </g>
    </svg>
  );
}
