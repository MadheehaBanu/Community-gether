export default function LivePulse({ className }: { className?: string }) {
  return (
    <span className={`relative flex h-2.5 w-2.5 ${className}`}>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest opacity-75" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-forest" />
    </span>
  );
}
