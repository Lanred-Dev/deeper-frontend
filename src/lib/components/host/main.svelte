<script lang="ts">
    import Lobby from "./lobby.svelte";
    import GameIntro from "./gameIntro.svelte";
    import Overview from "./overview.svelte";
    import PresentPlayerRoles from "./presentPlayerRoles.svelte";
    import { gameState, gameScreen } from "$lib/scripts/shared/data";
</script>

{#if $gameState === "gameIntro"}
    <GameIntro />
{/if}

{#if $gameState === "lobby"}
    <Lobby />
{/if}

{#if $gameState === "presentPlayerRoles"}
    <PresentPlayerRoles></PresentPlayerRoles>
{/if}

{#if $gameState === "game"}
    {#if $gameScreen === "home"}
        <Overview />
    {/if}
{/if}
