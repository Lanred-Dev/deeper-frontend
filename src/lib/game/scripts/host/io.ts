import handleSocketEvent from "../shared/functions/handleSocketEvent";

import gameEvent from "./events/socket/gameEvent";
import gameEventHost from "./events/socket/gameEvent-host";

export default function io() {
    //game events
    handleSocketEvent("gameEvent", gameEvent);
    handleSocketEvent("gameEvent-host", gameEventHost);
}
