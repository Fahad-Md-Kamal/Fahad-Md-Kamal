// Fixed, viewport-pinned ambient layer: soft gradient glow + faint grid + grain.
// Every section paints a near-opaque tint over this, so it reads as a subtle
// mood/texture rather than a distraction — intentionally understated.
export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-primary/10 blur-[140px] animate-float-slow" />
      <div className="absolute top-1/3 -right-1/4 w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full bg-secondary/10 blur-[140px] animate-float-slower" />
      <div className="absolute bottom-0 left-1/4 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-primary/[0.06] blur-[140px] animate-float-slow" />

      {/* Faint engineering-grid texture, ties into the site's technical tone */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--text-primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--text-primary)) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Subtle grain so flat dark areas don't read as sterile/flat */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] mix-blend-overlay">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  )
}
