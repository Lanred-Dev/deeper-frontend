import type player from "$lib/scripts/types/player";
import { playerCount as playerCountStore, playersWriteable, playersRaw } from "$lib/scripts/host/data";

export default function playerJoin(player: player, playerCount: number) {
    playersRaw[playerCount - 1] = player;
    playerCountStore.update(() => playerCount);
    playersWriteable.update(() => playersRaw);
}