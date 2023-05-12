<script lang="ts">
    import { objectives } from "$lib/scripts/host/data";
</script>

<div class="flex flex-col gap-2 items-start text-left absolute left-[5%] top-[25%] z-10">
    <div class="mb-4">
        <p class="text-white text-4xl mb-1">objectives</p>
        <p class="text-light text-lg">{Object.values($objectives).length} {Object.values($objectives).length === 1 ? "objective" : "objectives"}</p>
    </div>

    {#each Object.values($objectives) as objective}
        <p class="text-light text-base flex justify-start items-center">
            <span class="w-3 aspect-square bg-blue-700 inline-block mr-2 rounded-full" />
            {objective}
        </p>
    {/each}
</div>
