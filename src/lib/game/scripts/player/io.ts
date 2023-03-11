import handleSocketEvent from "../shared/functions/handleSocketEvent";

import kickedFromLobby from "./events/socket/kickedFromLobby";

import gameEvent from "./events/socket/gameEvent";

export default function io() {
    //lobby
    handleSocketEvent("kickedFromLobby", kickedFromLobby);

    //game events
    handleSocketEvent("gameEvent", gameEvent);
}
