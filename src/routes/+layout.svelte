<script lang="ts">
    import { onMount } from "svelte";
    import "$lib/tailwind.css";

    function resizeContent(heightFulls: Array<HTMLElement>) {
        heightFulls.forEach((element: HTMLElement) => {
            element.style.height = `${window.innerHeight}px`;
        });
    }

    onMount(() => {
        let heightScreenElements: Array<HTMLElement> = Array.from(document.querySelectorAll(".h-screen") as unknown as HTMLCollectionOf<HTMLElement>);

        resizeContent(heightScreenElements);
        window.addEventListener("resize", () => {
            Array.from(document.querySelectorAll(".h-screen") as unknown as HTMLCollectionOf<HTMLElement>);
            resizeContent(heightScreenElements);
        });
    });
</script>

<main class="w-screen h-screen overflow-hidden box-border select-text tracking-wider font-hiBlack text-center text-white">
    <slot />
</main>
