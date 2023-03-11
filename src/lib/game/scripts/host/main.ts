import { get } from "svelte/store";
import { goto } from "$app/navigation";
import io from "./io";
import { socket, gameData as gameDataWriteable, gameState } from "../shared/data";
import { playersWriteable, playersRaw, playerCount } from "./data";
import type player from "../types/player";

export default function main() {
    for (let index = 0; index < 9; index++) {
        playersRaw[index] = false;
    }

    gameState.update(() => "lobby");
    playersWriteable.update(() => playersRaw);
    io();

    const gameData = get(gameDataWriteable);

    socket.emit("joinLobby-host", gameData.lobbyCode, gameData.token, (joinedLobby: boolean, players: Array<player>) => {
        if (joinedLobby === false) {
            goto("/", { replaceState: true });
            socket.removeAllListeners();
            return;
        }

        for (let index = 0; index < players.length; index++) {
            playersRaw[index] = players[index];
        }

        playerCount.update(() => players.length);
        playersWriteable.update(() => playersRaw);
    });
}
