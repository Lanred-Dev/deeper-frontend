import type player from "$lib/scripts/types/player";
import { writable, type Writable } from "svelte/store";

export const playerCount: Writable<number> = writable(0);

export const playersRaw: Array<player | boolean> = [];

export const playersWriteable: Writable<Array<player | boolean>> = writable([]);

export const gameStartTime: Writable<Date> = writable();

export const objectives: Writable<any> = writable({});
