import { get } from "svelte/store";
import { goto } from "$app/navigation";
import io from "./io";
import { socket, gameData as gameDataWriteable, gameState } from "../shared/data";

export default function main() {
    gameState.update(() => "lobby");
    io();

    const gameData = get(gameDataWriteable);

    socket.emit("joinLobby", gameData.lobbyCode, gameData.username, (joinedLobby: boolean) => {
        if (joinedLobby === true) return;

        goto("/", { replaceState: true });
        socket.removeAllListeners();
    });
}
