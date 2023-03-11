<script lang="ts">
    import { secondsToMinutes } from "date-fns";
    import { gameData, gameState, socket } from "$lib/game/scripts/shared/data";
    //1800 is 30 minutes in seconds
    let timeLeft: number = 1800;

    const gameStateUnsubscribe = gameState.subscribe((state: string) => {
        if (state !== "game") return;

        gameStateUnsubscribe();
        let timerInterval = setInterval(() => {
            if (timeLeft === 0) {
                clearInterval(timerInterval);
                gameState.update(() => "end");
                return;
            }

            timeLeft--;
        }, 1000);
    });
</script>

<div class="w-full flex justify-end relative">
    {#if $gameState === "game"}
        <p class="text-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{secondsToMinutes(timeLeft)}:{timeLeft - 60 * secondsToMinutes(timeLeft) < 10 ? "0" : ""}{timeLeft - 60 * secondsToMinutes(timeLeft)}</p>
    {/if}

    {#if $gameState !== "lobby"}
        <button class="flex gap-2 justify-center items-center font-sans uppercase">
            <p class="text-2xl text-light">{$gameData.lobbyCode}</p>
            <img class="w-10 aspect-square" src="/images/icons/light/code-bracket.svg" alt="code bracket" />
        </button>
    {/if}
</div>
