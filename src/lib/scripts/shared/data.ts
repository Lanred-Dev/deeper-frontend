import { writable, type Writable } from "svelte/store";
import type { Socket } from "socket.io-client";
import { info } from "@lanred/basic-logger";

export let socket: Socket;

export const gameData: Writable<{ [key: string]: string }> = writable({});

export const gameState: Writable<string> = writable("");

export const gameScreen: Writable<string> = writable("");

export function updateValue(value: string, data: any) {
    info("updating value\n", value, "\n", data)

    switch (value) {
        case "socket":
            socket = data;
            break;
        case "gameData":
            gameData.update(() => data);
            break;
    }
}
