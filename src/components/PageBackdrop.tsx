export function PageBackdrop() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="blob"
        style={{ width: 520, height: 520, top: "-120px", left: "-120px", background: "oklch(0.7 0.22 250)" }}
      />
      <div
        className="blob"
        style={{ width: 600, height: 600, top: "30%", right: "-180px", background: "oklch(0.7 0.24 320)", animationDelay: "-6s" }}
      />
      <div
        className="blob"
        style={{ width: 480, height: 480, bottom: "-160px", left: "20%", background: "oklch(0.65 0.2 285)", animationDelay: "-12s" }}
      />
    </div>
  );
}
