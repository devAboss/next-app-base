"use client";

import { useEffect } from "react";

export function GrabLoader() {
  useEffect(() => {
    void import("react-grab").then(({ init }) => init());
  }, []);
  return null;
}
