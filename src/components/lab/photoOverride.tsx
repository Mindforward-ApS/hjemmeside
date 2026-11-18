"use client";

// Lets a preview swap the page's photos without touching the live page (e.g. /preview/forside-lyse with the
// documentary photos). Keys: the skill names (Mails, Møder, Excel, Data) and "pilot".
import { createContext, useContext } from "react";

export type PhotoSpec = { src: string; pos?: string; ui?: "left" | "right" };
export const PhotoOverride = createContext<Record<string, PhotoSpec>>({});
export const usePhoto = <T extends PhotoSpec>(key: string, fallback: T): T => ({ ...fallback, ...(useContext(PhotoOverride)[key] ?? {}) });
