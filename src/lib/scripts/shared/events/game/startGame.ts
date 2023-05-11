import { gameState, gameScreen } from "$lib/scripts/shared/data";

export default function startGame() {
    gameState.update(() => "game");
    gameScreen.update(() => "home");
}
