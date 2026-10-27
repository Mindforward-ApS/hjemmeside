"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// One place to register plugins (client only).
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Motion tokens mirrored from globals.css
export const ease = { enter: "expo.out", exit: "power3.in", standard: "power2.inOut" };
export const reduceQuery = "(prefers-reduced-motion: reduce)";
export const motionQuery = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
