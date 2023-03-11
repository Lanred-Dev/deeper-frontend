import { info } from "@lanred/basic-logger";
import { socket } from "../data";

export default function handleSocketEvent(event: string, handler: Function, ...customData: any[]) {
    socket.on(event, (...eventData: any[]) => {
        info("handling event\n", event, "\n", ...eventData);
        handler(...customData, ...eventData);
    });
}
