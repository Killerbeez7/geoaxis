type Props = {
  isEnabled: boolean;
};

export default function SquintTest({ isEnabled = true }: Props) {
  const redner = isEnabled && (
    <div
      className="fixed inset-0 z-9999 pointer-events-none backdrop-blur-[6px] bg-black/10 grayscale-[0.2]"
      aria-hidden="true"
    />
  );

  return redner;
}
