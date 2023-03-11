import startGame from "../../../shared/events/game/startGame";
import startIntro from "../../../shared/events/game/startIntro";
import presentRole from "../game/presentRole";
import { info } from "@lanred/basic-logger";

export default function gameEvent(event: string, ...eventData: any[]) {
    info("game event\n", event, "\n", ...eventData);

    switch (event) {
        case "startGame":
            return startGame();
        case "startIntro":
            return startIntro();
        case "presentRole":
            return presentRole(...(eventData as [string]));
    }
}