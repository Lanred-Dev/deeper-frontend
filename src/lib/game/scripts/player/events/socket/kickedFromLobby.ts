import { goto } from "$app/navigation";
import { socket } from "../../../shared/data";

export default function kickedFromLobby() {
    goto("/", { replaceState: true });
    socket.removeAllListeners();
}
