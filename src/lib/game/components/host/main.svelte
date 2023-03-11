<script lang="ts">
    import Lobby from "./lobby.svelte";
    import GameIntro from "./gameIntro.svelte";
    import Overview from "./overview.svelte";
    import { gameState, gameScreen } from "$lib/game/scripts/shared/data";
</script>

{#if $gameState === "gameIntro"}
    <GameIntro />
{/if}

{#if $gameState === "lobby"}
    <Lobby />
{/if}

{#if $gameState === "game"}
    {#if $gameScreen === "home"}
        <Overview />
    {/if}
{/if}
