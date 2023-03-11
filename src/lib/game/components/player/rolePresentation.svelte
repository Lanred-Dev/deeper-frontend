<script lang="ts">
    import { socket } from "$lib/game/scripts/shared/data";
    import { role, roleColorCodes } from "../../scripts/player/data";
    let screenIndex = 0;
</script>

<div class="polka-background w-screen h-screen absolute left-0 top-0 flex flex-col items-center justify-center px-12">
    {#if screenIndex === 0}
        <p class="text-4xl mb-10">do not share with anyone</p>

        <button
            class="btn-secondary w-fit px-10"
            on:click={() => {
                screenIndex = 1;
            }}>ok</button
        >
    {:else if screenIndex === 1}
        <p class="text-lg text-light">your role is</p>
        <p class="text-4xl mb-10" style="color: {roleColorCodes[$role]};">{$role}</p>

        <button
            class="btn-secondary w-fit px-10"
            on:click={() => {
                screenIndex = 2;
                socket.emit("confirmRole");
            }}>ok</button
        >
    {:else if screenIndex === 2}
        <p class="text-2xl text-light">waiting for other players</p>
    {/if}
</div>
