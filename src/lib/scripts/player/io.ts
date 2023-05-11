import handleSocketEvent from "$lib/scripts/shared/functions/handleSocketEvent";

import kickedFromLobby from "$lib/scripts/player/events/socket/kickedFromLobby";

import gameEvent from "$lib/scripts/player/events/socket/gameEvent";

export default function io() {
    //lobby
    handleSocketEvent("kickedFromLobby", kickedFromLobby);

    //game events
    handleSocketEvent("gameEvent", gameEvent);
}
