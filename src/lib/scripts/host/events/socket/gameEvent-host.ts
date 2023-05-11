import playerJoin from "$lib/scripts/host/events/game/playerJoin";
import playerLeave from "$lib/scripts/host/events/game/playerLeave";
import presentPlayerRoles from "$lib/scripts/host/events/game/presentPlayerRoles";
import { info } from "@lanred/basic-logger";

export default function gameEventHost(event: string, ...eventData: any) {
    info("game event host\n", event, "\n", ...eventData);

    switch (event) {
        case "playerJoin":
            return playerJoin(...(eventData as [any, number]));
        case "playerLeave":
            return playerLeave(...(eventData as [string, number]));
            case "presentPlayerRoles":
            return presentPlayerRoles();
    }
}
