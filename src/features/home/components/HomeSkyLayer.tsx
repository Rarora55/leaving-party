interface HomeSkyLayerProps {
  color: string;
}

export function HomeSkyLayer({ color }: HomeSkyLayerProps) {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0" style={{ backgroundColor: color }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.44),transparent_36%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[36svh] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,248,234,0.44)_100%)]" />
    </div>
  );
}
