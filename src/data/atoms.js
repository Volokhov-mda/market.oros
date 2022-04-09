import { atom } from "jotai";

export const userAtom = atom(null);
export const cartItemsNumAtom = atom("...");

export const activeFilterTab = atom(null);

export const contextReorderButtonAtom = atom(undefined);
export const contextArchiveButtonAtom = atom(undefined);

export const gridShortened = atom(false);
export const sortingOpened = atom(false);
