import { gameState } from "$lib/scripts/shared/data";
import { role as roleWriteable } from "$lib/scripts/player/data";

export default function presentRole(role: string) {
    roleWriteable.update(() => role);
    gameState.update(() => "rolePresentation");
}
