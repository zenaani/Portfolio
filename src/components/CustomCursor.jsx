import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);

      const target = document.elementFromPoint(e.clientX, e.clientY);
      const cursorTarget = target ? target.closest("[data-cursor]") : null;
      if (cursorTarget) {
        setLabel(cursorTarget.getAttribute("data-cursor") || "");
      } else {
        setLabel("");
      }
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${!visible ? "is-hidden" : ""} ${label ? "is-active" : ""}`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
      data-label={label}
      aria-hidden="true"
    />
  );
}
