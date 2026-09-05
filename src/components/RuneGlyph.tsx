import { runeFor } from "../data";

type Props = {
  ch: string;
  className?: string;
  strokeWidth?: number;
};

/** Dibuja la runa correspondiente a un carácter como SVG de trazos. */
export default function RuneGlyph({ ch, className, strokeWidth = 2.3 }: Props) {
  const strokes = runeFor(ch);
  return (
    <svg
      viewBox="0 0 20 30"
      fill="none"
      className={className}
      aria-hidden="true"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {strokes.map((pts, i) => (
        <polyline
          key={i}
          points={pts}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
