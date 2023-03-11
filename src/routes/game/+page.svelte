<script lang="ts">
    export let data: any;

    import PlayerNav from "$lib/game/components/player/nav.svelte";
    import HostNav from "$lib/game/components/host/nav.svelte";

    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import socketConnection from "$lib/socket-connection";
    import { updateValue } from "$lib/game/scripts/shared/data";
    let gameComponents: any;

    onMount(() => {
        if (data.lobbyCode == null || typeof data.lobbyCode !== "string" || data.lobbyCode.length !== 4 || (data.lobbyHost === false && (data.username === null || typeof data.username !== "string") === true)) return goto("/", { replaceState: true });

        socketConnection.emit("checkLobbyCode", data.lobbyCode, async function (validCode: boolean) {
            if (validCode !== true) return goto("/", { replaceState: true });

            updateValue("gameData", data);
            updateValue("socket", socketConnection);

            if (data.lobbyHost === true) {
                gameComponents = (await import("$lib/game/components/host/main.svelte")).default;
                (await import("$lib/game/scripts/host/main")).default();
            } else {
                gameComponents = (await import("$lib/game/components/player/main.svelte")).default;
                (await import("$lib/game/scripts/player/main")).default();
            }
        });
    });
</script>

<svelte:head>
    <title>deeper</title>
</svelte:head>

<!--main game focus: Mettlesome Co https://socket.io/docs/v4/rooms/#disconnection https://dev.to/theether0/sveltekit-with-socketio-and-nodejs-285h https://www.vantajs.com-->

<nav class="w-screen px-6 py-3 absolute left-0 top-0 flex {data.lobbyHost === false ? 'justify-between' : 'justify-end'} items-center text-base z-10 bg-transparent">
    {#if data.lobbyHost === false}
        <PlayerNav />
    {:else}
        <HostNav />
    {/if}
</nav>

<div>
    <svelte:component this={gameComponents} />
</div>
