import { gameState } from "../../data";

export default function startIntro() {
    gameState.update(() => "gameIntro");
}