import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

const Ic = ({ size = 18, className, children, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    {children}
  </svg>
);

export const IconHome     = (p: IconProps) => <Ic {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z"/></Ic>;
export const IconEdit     = (p: IconProps) => <Ic {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z"/></Ic>;
export const IconCal      = (p: IconProps) => <Ic {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Ic>;
export const IconClip     = (p: IconProps) => <Ic {...p}><rect x="4" y="4" width="16" height="18" rx="2"/><path d="M9 2h6v4H9z"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></Ic>;
export const IconMoon     = (p: IconProps) => <Ic {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></Ic>;
export const IconSignOut  = (p: IconProps) => <Ic {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></Ic>;
export const IconChev     = (p: IconProps) => <Ic {...p}><polyline points="6 9 12 15 18 9"/></Ic>;
export const IconCheck    = (p: IconProps) => <Ic {...p}><polyline points="20 6 9 17 4 12"/></Ic>;
export const IconPlus     = (p: IconProps) => <Ic {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Ic>;

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

/* ── Hourglass: timer-driven, imperative-handle component ──────────── */

export interface HourglassHandle {
  /** Adds 25% of the original base duration to remaining time */
  addTime: () => void;
  /** Resets the timer back to the original duration */
  restart: () => void;
  /** Instantly drains sand and calls onTimeUp after 600ms */
  drain: () => void;
}

interface HourglassProps {
  /** Total duration in seconds */
  duration: number;
  /** Fired when time runs out (natural or via drain()) */
  onTimeUp?: () => void;
}

export const Hourglass = React.forwardRef<HourglassHandle, HourglassProps>(
  ({ duration, onTimeUp }, ref) => {
    // baseDuration never changes (used for addTime's 25% calc)
    const baseDuration = React.useRef(duration);
    // totalTime can grow via addTime
    const [totalTime, setTotalTime] = React.useState(duration);
    const [elapsed, setElapsed] = React.useState(0);
    const [drained, setDrained] = React.useState(false);
    const onTimeUpRef = React.useRef(onTimeUp);
    React.useEffect(() => {
      onTimeUpRef.current = onTimeUp;
    }, [onTimeUp]);


    // ── Tick every second ──
    React.useEffect(() => {
      if (drained) return;
      if (elapsed >= totalTime) {
        onTimeUpRef.current?.();
        return;
      }
      const id = setInterval(() => {
        setElapsed(prev => {
          const next = prev + 1;
          if (next >= totalTime) {
            clearInterval(id);
            onTimeUpRef.current?.();
            return totalTime;
          }
          return next;
        });
      }, 1000);
      return () => clearInterval(id);
    }, [elapsed, totalTime, drained]);

    // ── Imperative handle ──
    React.useImperativeHandle(ref, () => ({
      addTime() {
        const extra = Math.round(baseDuration.current * 0.25);
        setTotalTime(prev => prev + extra);
      },
      restart() {
        setTotalTime(baseDuration.current);
        setElapsed(0);
        setDrained(false);
      },
      drain() {
        setDrained(true);
        setElapsed(totalTime);               // visually empty
        setTimeout(() => {
          onTimeUpRef.current?.();
        }, 600);
      },
    }));

    // ── Derived SVG values ──
    const progress = Math.min(elapsed / Math.max(totalTime, 1), 1);  // 0 → 1
    const past75 = progress >= 0.75;
    const sandColor = past75 ? '#8e2e26' : '#1f6e66';

    // Top sand: y goes from 25 (full) → 190 (empty)
    const topY = 25 + progress * 165;
    const topPoints = `-10,${topY} 260,${topY} 260,190 -10,190`;

    // Bottom sand (teal): y goes from 355 (empty) → 272 (stops at 75%)
    const tealProgress = Math.min(progress / 0.75, 1);
    const bottomTealY = 355 - tealProgress * 83;
    const bottomTealPts = `-10,${bottomTealY} 260,${bottomTealY} 260,355 -10,355`;

    // Bottom sand (red): only appears after 75%, fills from 272 → 190
    const redProgress = past75 ? (progress - 0.75) / 0.25 : 0;
    const bottomRedY = 272 - redProgress * 82;
    const bottomRedPts = `-10,${bottomRedY} 260,${bottomRedY} 260,272 -10,272`;

    // Falling stream: y2 shrinks from 355 → 190 as sand fills
    const streamY2 = 355 - progress * 165;
    const streamOpacity = progress > 0.01 && progress < 0.98 ? 1 : 0;

    return (
      <svg className="hourglass-wrap" viewBox="0 0 270 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="topClip">
            <path d="M 35 25 L 215 25 C 215 100, 128 145, 128 190 L 122 190 C 122 145, 35 100, 35 25 Z"/>
          </clipPath>
          <clipPath id="bottomClip">
            <path d="M 122 190 L 128 190 C 128 235, 215 280, 215 355 L 35 355 C 35 280, 122 235, 122 190 Z"/>
          </clipPath>
          <filter id="softShadow" x="-25%" y="-15%" width="150%" height="135%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
            <feOffset dx="0" dy="5"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.2"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#softShadow)">
          <g>
            {/* Frame - top and bottom bars */}
            <rect x="10" y="5" width="230" height="18" rx="9" fill="none" stroke="#1f5a6c" strokeWidth="4"/>
            <rect x="10" y="357" width="230" height="18" rx="9" fill="none" stroke="#1f5a6c" strokeWidth="4"/>
            {/* Side pillars */}
            <line x1="20" y1="23" x2="20" y2="357" stroke="#1f5a6c" strokeWidth="4" strokeLinecap="round"/>
            <line x1="230" y1="23" x2="230" y2="357" stroke="#1f5a6c" strokeWidth="4" strokeLinecap="round"/>

            {/* Top sand (drains down) */}
            <g clipPath="url(#topClip)">
              <polygon points={topPoints} fill={sandColor}
                style={{ transition: drained ? 'none' : 'all 1s linear' }}/>
            </g>

            {/* Bottom sand (fills up, teal portion) */}
            <g clipPath="url(#bottomClip)">
              <polygon points={bottomTealPts} fill="#1f6e66"
                style={{ transition: drained ? 'none' : 'all 1s linear' }}/>
            </g>

            {/* Bottom sand (fills up, red portion after 75%) */}
            <g clipPath="url(#bottomClip)">
              <polygon points={bottomRedPts} fill="#8e2e26"
                style={{ transition: drained ? 'none' : 'all 1s linear' }}/>
            </g>

            {/* Falling sand stream */}
            <line x1="125" y1="190" x2="125" y2={streamY2} stroke={sandColor} strokeWidth="3"
              strokeLinecap="round" strokeDasharray="5 5" opacity={streamOpacity}
              style={{ transition: drained ? 'none' : 'all 1s linear' }}>
              <animate attributeName="stroke-dashoffset"
                from="0" to="-10" dur="0.4s" repeatCount="indefinite"/>
            </line>

            {/* Glass curves */}
            <path d="M 35 25 C 35 100, 122 145, 122 190 C 122 235, 35 280, 35 355"
              fill="none" stroke="#1f5a6c" strokeWidth="4" strokeLinecap="round"/>
            <path d="M 215 25 C 215 100, 128 145, 128 190 C 128 235, 215 280, 215 355"
              fill="none" stroke="#1f5a6c" strokeWidth="4" strokeLinecap="round"/>
          </g>
        </g>
      </svg>
    );
  }
);
