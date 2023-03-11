import type player from "../types/player";
import { writable, type Writable } from "svelte/store";

export const playerCount: Writable<number> = writable(0);

export const playersRaw: Array<player | boolean> = [];

export const playersWriteable: Writable<Array<player | boolean>> = writable([]);

export const gameStartTime: Writable<Date> = writable();
