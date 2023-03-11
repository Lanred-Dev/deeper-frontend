<script lang="ts">
    import MovingStars from "$lib/components/backgrounds/moving-stars.svelte";

    import { onDestroy, onMount } from "svelte";
    import { gameData, socket } from "$lib/game/scripts/shared/data";
    import { playerCount, playersWriteable as playersStore } from "$lib/game/scripts/host/data";
    import animejs from "animejs";
    import { info } from "@lanred/basic-logger";
    import until from "$lib/game/scripts/shared/functions/until";
    const lobbyMusic: Array<HTMLAudioElement> = [new Audio("/audio/music/lobby.mp3"), new Audio("/audio/music/lobby2.mp3")];

    function transitionContainerOut(node: HTMLElement) {
        animejs({
            targets: node,
            opacity: 0,
            easing: "linear",
            duration: 2500,
        });

        return {
            duration: 2500,
        };
    }

    async function playAudio(audioIndex: number, nextAudioIndex: number) {
        info("playing song\n", audioIndex);
        lobbyMusic[audioIndex].play();

        await until(() => lobbyMusic[audioIndex].ended === true || lobbyMusic[audioIndex].paused === true);

        info("song ended\n", audioIndex);
        playAudio(nextAudioIndex, nextAudioIndex + 1 > lobbyMusic.length - 1 ? 0 : nextAudioIndex + 1);
    }

    onMount(() => {
        playAudio(0, 1);
    });

    onDestroy(() => {
        lobbyMusic.forEach((audio: HTMLAudioElement) => {
            audio.pause();
        });
    });
</script>

<MovingStars classes={"w-screen h-screen absolute top-0 left-0 z-[-1] polka-background opacity-20"} starAmount={75} parallax={3} />

<div class="w-screen h-screen absolute left-1/2 -translate-x-1/2 top-0 flex items-center justify-center" out:transitionContainerOut>
    <div class="w-[80vw] lg:w-[75vw] 2xl:w-[57.5vw] h-fit flex justify-between">
        <div class="flex-1 flex flex-col justify-between items-start text-left py-[5%]">
            <div class="mb-6">
                <p class="flex gap-2 items-center font-sans text-3xl text-light mb-6 uppercase">
                    <img class="w-12 aspect-square" src="/images/icons/light/code-bracket.svg" alt="code bracket" />
                    {$gameData.lobbyCode}
                </p>

                <h1 class="text-white text-4xl mb-2">{$playerCount}/9 players</h1>

                <p class="text-lg text-light">
                    {#if $playerCount < 3}
                        waiting on {3 - $playerCount} {3 - $playerCount > 1 ? "players" : "player"}
                    {:else}
                        recommended player count 5+
                    {/if}
                </p>
            </div>

            <button
                class="btn-secondary w-fit px-10 {$playerCount >= 3 ? 'brightness-100 pointer-events-auto' : 'brightness-50 pointer-events-none'}"
                on:click={() => {
                    socket.emit("gameEvent-host", "startGameIntro");
                }}
            >
                <img class="w-8" src="/images/icons/white/play.svg" alt="start" />
                start game
            </button>
        </div>

        <div class="flex-1 flex justify-end">
            <div class="grid gap-8 grid-rows-3 grid-cols-3">
                {#each $playersStore as player}
                    <button
                        class="w-[125px] h-[125px] aspect-square relative overflow-hidden bg-background border-2 rounded-2xl p-4 flex flex-col justify-center gap-1 group {player === false ? 'pointer-events-none border-red-700 redInsideGlow' : 'pointer-events-auto border-blue-700 blueInsideGlow'}"
                        on:click={() => {
                            if (typeof player === "boolean") return;

                            info("kicking player\n", player.username);
                            socket.emit("gameEvent-host", "kickPlayer", player.username);
                        }}
                    >
                        <img class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-12 z-[2] {player !== false ? 'opacity-0 group-hover:opacity-100 transition-opacity duration-300' : 'opacity-50'}" src="/images/icons/{player === false ? 'light' : 'red'}/no.svg" alt="no" />

                        {#if player !== false && typeof player !== "boolean"}
                            <div class="w-full flex flex-col justify-center group-hover:opacity-10 transition-opacity duration-300">
                                <img class="h-12" src="/images/icons/players/{player.icon}.svg" alt="{player.username}'s icon" />
                                <p class="overflow-hidden text-ellipsis whitespace-nowrap text-light shadow-inner">{player.username}</p>
                            </div>
                        {/if}
                    </button>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .redInsideGlow {
        box-shadow: 0px 0px 25px 5px rgb(127 29 29 / 0.25) inset;
    }

    .blueInsideGlow {
        box-shadow: 0px 0px 25px 5px rgb(30 58 138 / 0.25) inset;
    }
</style>
