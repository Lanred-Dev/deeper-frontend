<script lang="ts">
    import { gameData, socket, gameState } from "$lib/game/scripts/shared/data";
    import { goto } from "$app/navigation";
    import type { Socket } from "socket.io-client";

    function leaveLobby() {
        socket.emit("leaveLobby");
        socket.removeAllListeners();
        goto("/", { replaceState: false });
    }
</script>

<p>{$gameData.username}</p>

<div class="flex gap-2 items-center">
    <p class="text-base text-light">{$gameData.lobbyCode}</p>

    {#if $gameState === "preGame"}
        <button class="w-5 aspect-square" aria-label="leave lobby" on:click={leaveLobby}>
            <img class="w-full h-full" src="/images/icons/red/leave.svg" alt="leave" />
        </button>
    {/if}
</div>
