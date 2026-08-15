"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGSAP(
  callback: (ctx: gsap.Context) => void,
  deps: unknown[] = []
) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context(callback, scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
