// ---------------------------------------------------------------------------
// Services Section - EIS Logistics
// ---------------------------------------------------------------------------
// 2x2 grid. Each service has title + description + animation strip below.
// All vehicle animations use the same driveStopGo timing (synchronized).
// Warehouse rebuilt with bigger forklift, loading dock, and truck backing in.
// No numbers. Higher opacity on all elements.
// ---------------------------------------------------------------------------

import { clientConfig } from "../../client-config";
import SectionHeading from "../ui/SectionHeading";
import StaggerChildren from "../animation/StaggerChildren";

const animationStyles = `
@keyframes driveStopGo {
  0%   { transform: translateX(-45%); }
  28%  { transform: translateX(12%); }
  55%  { transform: translateX(12%); }
  100% { transform: translateX(145%); }
}
@keyframes idleRock {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-1.5px); }
}
@keyframes exhaust {
  0% { opacity: 0.5; transform: translate(0, 0) scale(1); }
  100% { opacity: 0; transform: translate(-12px, -6px) scale(2); }
}
@keyframes roadDash {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -28; }
}
/* Warehouse: forklift approaches truck, loads, returns. All 6s. */
@keyframes forkliftToTruck {
  0%, 5%   { transform: translateX(0); }
  25%      { transform: translateX(55px); }
  30%, 40% { transform: translateX(55px); }
  50%      { transform: translateX(0); }
  100%     { transform: translateX(0); }
}
@keyframes crateDisappear {
  0%       { opacity: 1; }
  24%      { opacity: 1; }
  26%      { opacity: 0; }
  95%      { opacity: 0; }
  100%     { opacity: 1; }
}
/* Truck: parked at dock, leaves at 55% - exactly matching driveStopGo */
@keyframes warehouseTruckLeave {
  0%, 55%  { transform: translateX(0%); }
  56%      { transform: translateX(2%); }
  100%     { transform: translateX(145%); }
}
@keyframes doorSlide {
  0%, 8%   { transform: scaleY(1); transform-origin: top; }
  15%, 52% { transform: scaleY(0.15); transform-origin: top; }
  58%, 100%{ transform: scaleY(1); transform-origin: top; }
}
@keyframes lightGlow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}
`;

function HotShotAnim({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 400 90" className="w-full h-full" preserveAspectRatio="xMidYMid meet" fill="none">
      <line x1="0" y1="70" x2="400" y2="70" stroke={color} strokeWidth="1.5" strokeOpacity="0.15" />
      <line x1="0" y1="71.5" x2="400" y2="71.5" stroke={color} strokeWidth="0.8" strokeDasharray="8 6" strokeOpacity="0.25"
        style={{ animation: "roadDash 1.5s linear infinite" }} />
      {/* Sprinter van */}
      <g style={{ animation: "driveStopGo 6s cubic-bezier(0.4,0,0.2,1) infinite" }}>
        <g style={{ animation: "idleRock 0.6s ease-in-out infinite" }}>
          <rect x="140" y="44" width="50" height="24" rx="4" fill={color} fillOpacity="0.35" />
          <rect x="190" y="47" width="20" height="21" rx="3" fill={color} fillOpacity="0.4" />
          <rect x="193" y="49" width="13" height="10" rx="1.5" fill={color} fillOpacity="0.15" />
          <circle cx="157" cy="70" r="5" fill={color} fillOpacity="0.5" />
          <circle cx="180" cy="70" r="5" fill={color} fillOpacity="0.5" />
          <circle cx="202" cy="70" r="5" fill={color} fillOpacity="0.5" />
          {/* Headlight */}
          <rect x="210" y="54" width="2" height="5" rx="1" fill={color} fillOpacity="0.6" />
          {/* Exhaust */}
          <circle cx="138" cy="64" r="2.5" fill={color} fillOpacity="0.2" style={{ animation: "exhaust 0.8s ease-out infinite" }} />
          <circle cx="135" cy="61" r="2" fill={color} fillOpacity="0.15" style={{ animation: "exhaust 0.8s ease-out infinite 0.3s" }} />
        </g>
      </g>
    </svg>
  );
}

function FullTruckAnim({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 400 90" className="w-full h-full" preserveAspectRatio="xMidYMid meet" fill="none">
      <line x1="0" y1="72" x2="400" y2="72" stroke={color} strokeWidth="1.5" strokeOpacity="0.15" />
      <line x1="0" y1="73.5" x2="400" y2="73.5" stroke={color} strokeWidth="0.8" strokeDasharray="10 6" strokeOpacity="0.25"
        style={{ animation: "roadDash 2s linear infinite" }} />
      {/* 53' trailer */}
      <g style={{ animation: "driveStopGo 6s cubic-bezier(0.4,0,0.2,1) infinite" }}>
        <g style={{ animation: "idleRock 0.7s ease-in-out infinite" }}>
          <rect x="70" y="38" width="90" height="32" rx="3" fill={color} fillOpacity="0.3" />
          <rect x="65" y="40" width="7" height="26" rx="1.5" fill={color} fillOpacity="0.35" />
          <rect x="160" y="42" width="26" height="28" rx="3" fill={color} fillOpacity="0.38" />
          <rect x="164" y="44" width="16" height="12" rx="1.5" fill={color} fillOpacity="0.12" />
          <circle cx="92" cy="72" r="5" fill={color} fillOpacity="0.5" />
          <circle cx="108" cy="72" r="5" fill={color} fillOpacity="0.5" />
          <circle cx="140" cy="72" r="5" fill={color} fillOpacity="0.5" />
          <circle cx="175" cy="72" r="5" fill={color} fillOpacity="0.5" />
          <rect x="186" y="56" width="2.5" height="6" rx="1" fill={color} fillOpacity="0.6" />
          <circle cx="67" cy="66" r="2.5" fill={color} fillOpacity="0.18" style={{ animation: "exhaust 1s ease-out infinite" }} />
        </g>
      </g>
    </svg>
  );
}

function SpecializedAnim({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 400 90" className="w-full h-full" preserveAspectRatio="xMidYMid meet" fill="none">
      <line x1="0" y1="74" x2="400" y2="74" stroke={color} strokeWidth="1.5" strokeOpacity="0.15" />
      <line x1="0" y1="75.5" x2="400" y2="75.5" stroke={color} strokeWidth="0.8" strokeDasharray="10 6" strokeOpacity="0.25"
        style={{ animation: "roadDash 2s linear infinite" }} />
      {/* Flatbed + oversized I-beam */}
      <g style={{ animation: "driveStopGo 6s cubic-bezier(0.4,0,0.2,1) infinite" }}>
        <g style={{ animation: "idleRock 0.8s ease-in-out infinite" }}>
          <rect x="80" y="60" width="85" height="6" rx="1.5" fill={color} fillOpacity="0.35" />
          <rect x="165" y="48" width="24" height="26" rx="3" fill={color} fillOpacity="0.4" />
          <rect x="169" y="50" width="14" height="11" rx="1.5" fill={color} fillOpacity="0.12" />
          {/* I-beam load */}
          <rect x="74" y="36" width="92" height="8" rx="1" fill={color} fillOpacity="0.22" />
          <rect x="74" y="44" width="92" height="4" fill={color} fillOpacity="0.14" />
          <rect x="74" y="48" width="92" height="8" rx="1" fill={color} fillOpacity="0.22" />
          {/* Chains */}
          <line x1="95" y1="36" x2="92" y2="60" stroke={color} strokeWidth="1.2" strokeOpacity="0.3" />
          <line x1="140" y1="36" x2="143" y2="60" stroke={color} strokeWidth="1.2" strokeOpacity="0.3" />
          {/* Wide load flags */}
          <rect x="71" y="28" width="8" height="8" rx="1" fill="#F59E0B" fillOpacity="0.4" />
          <rect x="161" y="28" width="8" height="8" rx="1" fill="#F59E0B" fillOpacity="0.4" />
          {/* Wheels */}
          <circle cx="100" cy="74" r="5" fill={color} fillOpacity="0.5" />
          <circle cx="120" cy="74" r="5" fill={color} fillOpacity="0.5" />
          <circle cx="178" cy="74" r="5" fill={color} fillOpacity="0.5" />
          <rect x="189" y="58" width="2.5" height="6" rx="1" fill={color} fillOpacity="0.6" />
          <circle cx="78" cy="62" r="2.5" fill={color} fillOpacity="0.18" style={{ animation: "exhaust 1.2s ease-out infinite" }} />
        </g>
      </g>
    </svg>
  );
}

function WarehousingAnim({ color }: { color: string }) {
  // Ground at y=74 to match specialized equipment
  return (
    <svg viewBox="0 0 400 90" className="w-full h-full" preserveAspectRatio="xMidYMid meet" fill="none">
      {/* Ground line - same level as specialized */}
      <line x1="0" y1="74" x2="400" y2="74" stroke={color} strokeWidth="1.5" strokeOpacity="0.15" />

      {/* Warehouse structure - left side */}
      <rect x="5" y="14" width="200" height="60" rx="2" stroke={color} strokeWidth="0.8" strokeOpacity="0.15" fill={color} fillOpacity="0.02" />
      <line x1="5" y1="14" x2="105" y2="6" stroke={color} strokeWidth="0.6" strokeOpacity="0.1" />
      <line x1="205" y1="14" x2="105" y2="6" stroke={color} strokeWidth="0.6" strokeOpacity="0.1" />

      {/* Overhead lights */}
      {[50, 105, 160].map((x, i) => (
        <g key={x}>
          <line x1={x} y1="14" x2={x} y2="20" stroke={color} strokeWidth="0.6" strokeOpacity="0.12" />
          <ellipse cx={x} cy="22" rx="14" ry="4" fill={color} fillOpacity="0.05"
            style={{ animation: `lightGlow ${2.5 + i * 0.4}s ease-in-out infinite ${i * 0.5}s` }} />
        </g>
      ))}

      {/* Shelving racks */}
      {[12, 50, 88].map((x) => (
        <g key={`r${x}`}>
          <rect x={x} y="28" width="32" height="44" rx="1" stroke={color} strokeWidth="0.6" strokeOpacity="0.15" fill="none" />
          <line x1={x} y1="42" x2={x + 32} y2="42" stroke={color} strokeWidth="0.5" strokeOpacity="0.12" />
          <line x1={x} y1="56" x2={x + 32} y2="56" stroke={color} strokeWidth="0.5" strokeOpacity="0.12" />
          <rect x={x + 3} y={30} width="12" height="10" rx="0.5" fill={color} fillOpacity="0.1" />
          <rect x={x + 18} y={31} width="10" height="9" rx="0.5" fill={color} fillOpacity="0.08" />
          <rect x={x + 4} y={44} width="14" height="10" rx="0.5" fill={color} fillOpacity="0.09" />
          <rect x={x + 5} y={58} width="11" height="13" rx="0.5" fill={color} fillOpacity="0.08" />
        </g>
      ))}

      {/* Loading dock opening */}
      <rect x="186" y="34" width="22" height="40" rx="1" fill={color} fillOpacity="0.05" />
      <rect x="186" y="34" width="22" height="40" rx="1" fill={color} fillOpacity="0.04"
        style={{ animation: "doorSlide 6s ease-in-out infinite" }} />
      {/* Dock bumpers */}
      <rect x="184" y="68" width="3" height="6" rx="0.5" fill={color} fillOpacity="0.3" />
      <rect x="207" y="68" width="3" height="6" rx="0.5" fill={color} fillOpacity="0.3" />

      {/* Forklift - picks up crate, drives to truck, loads, returns */}
      <g style={{ animation: "forkliftToTruck 6s ease-in-out infinite" }}>
        {/* Forklift body */}
        <rect x="135" y="54" width="20" height="18" rx="2" fill={color} fillOpacity="0.35" />
        {/* Mast */}
        <rect x="156" y="38" width="3.5" height="34" rx="0.8" fill={color} fillOpacity="0.3" />
        {/* Forks */}
        <rect x="157" y="66" width="10" height="2.5" rx="0.5" fill={color} fillOpacity="0.4" />
        <rect x="157" y="60" width="10" height="2.5" rx="0.5" fill={color} fillOpacity="0.4" />
        {/* Crate on forks - disappears when loaded into truck */}
        <g style={{ animation: "crateDisappear 6s ease-in-out infinite" }}>
          <rect x="158" y="48" width="14" height="12" rx="1" fill={color} fillOpacity="0.28" />
          <line x1="165" y1="48" x2="165" y2="60" stroke={color} strokeWidth="0.5" strokeOpacity="0.12" />
        </g>
        {/* Wheels */}
        <circle cx="142" cy="74" r="4" fill={color} fillOpacity="0.45" />
        <circle cx="153" cy="74" r="4" fill={color} fillOpacity="0.45" />
        {/* Seat */}
        <rect x="138" y="54" width="6" height="9" rx="1" fill={color} fillOpacity="0.15" />
      </g>

      {/* Truck at dock - gets loaded, then leaves with the others */}
      <g style={{ animation: "warehouseTruckLeave 6s cubic-bezier(0.4,0,0.2,1) infinite" }}>
        <g style={{ animation: "idleRock 0.7s ease-in-out infinite" }}>
          {/* Trailer backed into dock */}
          <rect x="210" y="40" width="65" height="32" rx="2" fill={color} fillOpacity="0.28" />
          {/* Cab */}
          <rect x="275" y="44" width="22" height="28" rx="3" fill={color} fillOpacity="0.38" />
          <rect x="279" y="46" width="14" height="12" rx="1.5" fill={color} fillOpacity="0.12" />
          {/* Wheels */}
          <circle cx="228" cy="74" r="5" fill={color} fillOpacity="0.5" />
          <circle cx="248" cy="74" r="5" fill={color} fillOpacity="0.5" />
          <circle cx="268" cy="74" r="5" fill={color} fillOpacity="0.5" />
          <circle cx="289" cy="74" r="5" fill={color} fillOpacity="0.5" />
          {/* Headlight */}
          <rect x="297" y="58" width="2.5" height="6" rx="1" fill={color} fillOpacity="0.6" />
          {/* Exhaust */}
          <circle cx="208" cy="66" r="2" fill={color} fillOpacity="0.15" style={{ animation: "exhaust 1s ease-out infinite" }} />
        </g>
      </g>
    </svg>
  );
}

const serviceAnimations = [HotShotAnim, FullTruckAnim, SpecializedAnim, WarehousingAnim];

export default function Services() {
  const { services, colors } = clientConfig;

  if (services.length === 0) return null;

  return (
    <section
      id="services"
      className="relative py-section-sm md:py-section-md overflow-hidden"
      aria-label="Services"
    >
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

      {/* Background gradient washes */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at -5% 30%, ${colors.primary}12 0%, transparent 55%),
            radial-gradient(ellipse 50% 60% at 105% 70%, ${colors.primary}0D 0%, transparent 50%),
            radial-gradient(ellipse 80% 30% at 50% 0%, ${colors.primary}06 0%, transparent 40%)
          `,
        }}
      />

      <div className="relative z-10 section-container">
        <SectionHeading
          overline="What We Do"
          heading="Services"
          className="mb-16 md:mb-24"
        />

        <StaggerChildren
          staggerDelay={0.15}
          direction="up"
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 [&>div]:flex [&>div]:flex-col"
        >
          {services.map((service, index) => {
            const AnimComponent = serviceAnimations[index] || HotShotAnim;

            return (
              <div key={index} className="relative group flex flex-col h-full">
                {/* Text content - flex-1 pushes animation to bottom, min-h keeps titles aligned */}
                <div className="mb-5 flex-1">
                  <h3 className="font-display text-2xl md:text-3xl tracking-tight-display leading-tight mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted text-sm md:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Animation strip - always pinned to bottom */}
                <div
                  className="relative w-full h-24 md:h-28 rounded-xl overflow-hidden mt-auto"
                  style={{
                    background: `linear-gradient(180deg, ${colors.primary}05, ${colors.primary}0A)`,
                    border: `1px solid ${colors.primary}0D`,
                  }}
                >
                  <AnimComponent color={colors.primary} />
                </div>
              </div>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
