import { gameState } from "../../../shared/data";
import { role as roleWriteable } from "../../data";

export default function presentRole(role: string) {
    roleWriteable.update(() => role);
    gameState.update(() => "rolePresentation");
}
