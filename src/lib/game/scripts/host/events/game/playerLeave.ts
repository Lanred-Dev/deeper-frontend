import { playerCount as playerCountStore, playersWriteable, playersRaw } from "$lib/game/scripts/host/data";

export default function playerLeave(playerUsername: string, playerCount: number) {
    const playerIndex: number = playersRaw.findIndex((player: any) => player.username === playerUsername);
    playersRaw.splice(playerIndex, 1);
    playersRaw[8] = false;
    playerCountStore.update(() => playerCount);
    playersWriteable.update(() => playersRaw);
}
