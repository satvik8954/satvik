"use client";

import { useEffect } from "react";
import { initMotion } from "@/lib/motion";

/** Mounts all scroll/drag behaviour once the static page is on screen. */
export function Motion() {
  useEffect(() => initMotion(), []);
  return null;
}
