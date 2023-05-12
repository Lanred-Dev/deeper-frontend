<script lang="ts">
    import { secondsToMinutes } from "date-fns";
    import { gameData, gameState } from "$lib/scripts/shared/data";
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

    {#if $gameState === "game"}
        <p class="flex gap-2 items-center font-sans text-3xl text-light mb-6 uppercase">
            <img class="w-12 aspect-square" src="/images/icons/light/code-bracket.svg" alt="code bracket" />
            {$gameData.lobbyCode}
        </p>
    {/if}
</div>
