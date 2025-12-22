"use client";

import AsciiCanvasLoader from "./loader";

export default function TerminalLoader({ onFinish }: { onFinish: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <AsciiCanvasLoader done={onFinish} />
    </div>
  );
}
