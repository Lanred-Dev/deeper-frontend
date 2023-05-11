import { goto } from "$app/navigation";
import { socket } from "$lib/scripts/shared/data";

export default function kickedFromLobby() {
    goto("/", { replaceState: true });
    socket.removeAllListeners();
}
