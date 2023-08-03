"use client";

import { ReactNode } from "react";

export default function RippleButton({ className, onClick, children }: { className?: string, onClick?: any, children: ReactNode }) {
  const rippleEffect = (event: any) => {
    const btn = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.nativeEvent.offsetX - radius}px`;
    circle.style.top = `${event.nativeEvent.offsetY - radius}px`;
    circle.style.backgroundColor = "currentColor";
    circle.style.opacity = "0.2";
    circle.classList.add("ripple");

    const ripple = btn.getElementsByClassName("ripple")[0];

    ripple && ripple.remove();

    btn.appendChild(circle);

    onClick && onClick(event);
  }

  return (
    <button
      type="button"
      className={`${!className ? '' : className + ' '}relative overflow-hidden hover:bg-opacity-90`}
      onClick={rippleEffect}
    >
      {children}
    </button>
  )
}