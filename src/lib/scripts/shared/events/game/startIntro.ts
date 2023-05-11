import { gameState } from "$lib/scripts/shared/data";

export default function startIntro() {
    gameState.update(() => "gameIntro");
}