"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export type Display3DLine = {
  text: string;
  outline?: boolean;
  accentDot?: boolean;
};

/**
 * Layered 3D display typography.
 * Each line sits at a different translateZ depth inside a perspective
 * container; the whole block tilts subtly toward the pointer. Two depth
 * copies (::before / ::after in .line3d) create the extrusion.
 */
export default function Display3D({
  lines,
  level = 1,
  className = "",
  lineClassName = "",
}: {
  lines: Display3DLine[];
  level?: 1 | 2;
  className?: string;
  lineClassName?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 90, damping: 20, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 90, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = Math.max(
        -1,
        Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 1.6))
      );
      const ny = Math.max(
        -1,
        Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 1.6))
      );
      ry.set(nx * 5);
      rx.set(-ny * 3.5);
    };
    const onLeave = () => {
      rx.set(0);
      ry.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, rx, ry]);

  const Tag = level === 1 ? "h1" : "h2";

  return (
    <div ref={wrapRef} className={className} style={{ perspective: "1200px" }}>
      <motion.div
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
      >
        <Tag className={lineClassName}>
          {lines.map((line, i) => (
            <span
              key={line.text}
              className={`line3d block ${line.outline ? "line3d--outline" : ""}`}
              data-text={line.text}
              style={{
                transform: `translateZ(${(lines.length - i) * 16}px)`,
              }}
            >
              {line.accentDot ? (
                <>
                  {line.text.slice(0, -1)}
                  <span className="text-accent">{line.text.slice(-1)}</span>
                </>
              ) : (
                line.text
              )}
            </span>
          ))}
        </Tag>
      </motion.div>
    </div>
  );
}
