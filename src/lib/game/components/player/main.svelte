<script lang="ts">
    import Lobby from "./lobby.svelte";
    import GameIntro from "./gameIntro.svelte";
    import GameHome from "./gameHome.svelte";
    import RolePresentation from "./rolePresentation.svelte";
    import { gameState, gameScreen } from "$lib/game/scripts/shared/data";
</script>

{#if $gameState === "gameIntro"}
    <GameIntro />
{/if}

{#if $gameState === "rolePresentation"}
    <RolePresentation />
{/if}

{#if $gameState === "lobby"}
    <Lobby />
{/if}

{#if $gameState === "game"}
    {#if $gameScreen === "home"}
        <GameHome />
    {/if}
{/if}