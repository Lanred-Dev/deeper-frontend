<script lang="ts">
    import { onMount } from "svelte";
    import sparticles from "@lanred/sparticles";
    export let starAmount: number = 275;
    export let parallax: number = 5;
    export let canvasID: string = "canvas_15a36349-fe28-4899-9194-b9274aa752ef";
    export let classes: string = "w-screen h-screen bg-black";

    onMount(() => {
        const canvas: HTMLCanvasElement = document.querySelector(`[data-id="${canvasID}"]`)!;
        new sparticles(canvas, {
            composition: "source-over",
            count: starAmount,
            speed: 0.15,
            parallax: parallax,
            direction: 300,
            xVariance: 2,
            yVariance: 2,
            rotate: true,
            rotation: 1,
            alphaSpeed: 36,
            alphaVariance: 0.1,
            minAlpha: 0,
            maxAlpha: 1,
            minSize: 6,
            maxSize: 17,
            style: "fill",
            bounce: false,
            drift: 1,
            glow: 50,
            twinkle: false,
            color: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#6081FF", "#FFBF00"],
            shape: "circle",
            imageUrl: "",
        });
    });
</script>

<canvas class={classes} data-id={canvasID} />
