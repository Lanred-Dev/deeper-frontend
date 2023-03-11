import { gameState, gameScreen } from "../../data";

export default function startGame() {
    gameState.update(() => "game");
    gameScreen.update(() => "home");
}
