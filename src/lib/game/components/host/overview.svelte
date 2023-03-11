<script lang="ts">
    import animejs from "animejs";

    function transitionContainerIn(node: HTMLElement) {
        animejs({
            targets: node,
            opacity: 1,
            easing: "linear",
            duration: 2500,
        });

        return {};
    }
</script>

<div class="polka-background w-screen h-screen absolute left-0 top-0 flex items-center justify-center">
    <div class="flex flex-col gap-2 items-start text-left absolute left-[5%] top-[25%]">
        <div class="mb-4">
            <p class="text-white text-4xl mb-1">objectives</p>
            <p class="text-light text-lg">new objective</p>
        </div>

        <p class="text-light text-base flex justify-start items-center">
            <span class="w-3 aspect-square bg-blue-700 inline-block mr-2 rounded-full" />
            explore the room
        </p>

        <p class="text-light text-base flex justify-start items-center brightness-[0.45] grayscale-[100%] line-through">
            <span class="w-3 aspect-square bg-blue-700 inline-block mr-2 rounded-full" />
            explore the room
        </p>
    </div>

    <div class="h-[50vh] aspect-[1.5/1] border-[2.5px] border-gray-700 rounded-md relative overflow-hidden bg-background">
        <div class="w-[50%] h-[55%] absolute top-1/2 -translate-y-1/2 left-[10%] flex flex-col items-start z-[2]">
            <div class="flex gap-[0.1rem] justify-start h-3 mb-6">
                <div class="blueGlow w-3 aspect-square bg-blue-700 inline-block mr-2 rounded-full" />
                <div class="blueGlow w-3 aspect-square bg-blue-700 inline-block mr-2 rounded-full" />
                <div class="blueGlow w-3 aspect-square bg-blue-700 inline-block mr-2 rounded-full" />
                <div class="blueGlow w-3 aspect-square bg-blue-700 inline-block mr-2 rounded-full" />
                <div class="blueGlow w-3 aspect-square bg-blue-700 inline-block mr-2 rounded-full" />
                <div class="blueGlow w-3 aspect-square bg-blue-700 inline-block mr-2 rounded-full" />
                <div class="blueGlow w-3 aspect-square bg-blue-700 inline-block mr-2 rounded-full" />
                <div class="blueGlow w-3 aspect-square bg-blue-700 inline-block mr-2 rounded-full" />
                <div class="blueGlow w-3 aspect-square bg-blue-700 inline-block mr-2 rounded-full" />
            </div>

            <div class="text-left">
                <!--lobby-->
                <p class="text-white text-3xl mb-1">⌰⍜⏚⏚⊬</p>
                <p class="text-light text-base max-w-[80%]">⏃ ⍾⎍⟟☊☍ ☌⌰⏃⋏☊⟒ ⎅⍜⟒⌇ ⋏⍜⏁ ⌇⊑⍜⍙ ⏃⌰⌰ ⍜⎎ ⟟⏁⌇ ⊑⟟⎅⎅⟒⋏ ⎎⟒⏃⏁⎍⍀⟒⌇</p>
                <!--a quick glance does not show all of its hidden features-->
            </div>
        </div>

        <!--book shelfs-->
        <div class="w-full px-[5%] absolute flex justify-between">
            {#each Array(3) as _}
                <div class="w-[30%] aspect-[2/0.6] border-[2.5px] border-t-0 border-gray-700 rounded-lg overflow-hidden rounded-t-none" />
            {/each}
        </div>

        <div class="w-full px-[5%] absolute bottom-0 flex justify-between">
            {#each Array(3) as _}
                <div class="w-[30%] aspect-[2/0.6] border-[2.5px] border-b-0 border-gray-700 rounded-lg rounded-b-none" />
            {/each}
        </div>

        <!--register-->
        <div class="h-[40%] aspect-[1/3] absolute left-1/2 -translate-x-1/2 top-[8%] overflow-hidden rotate-[-90deg]">
            <!--counter base-->
            <div class="h-[100%] aspect-[1/3] border-[2.5px] border-r-0 border-gray-700 rounded-lg rounded-r-none" />
            <div class="h-[70%] aspect-[1/3] border-[2.5px] border-r-0 border-gray-700 rounded-lg rounded-r-none absolute top-1/2 -translate-y-1/2 left-[50%]" />
            <div class="h-[16%] border-r-[2.5px] border-gray-700 absolute top-0 right-0" />
            <div class="h-[16%] border-r-[2.5px] border-gray-700 absolute bottom-0 right-0" />

            <!--counter props-->
            <div class="h-[10%] aspect-[1.5/1] border-[2.5px] border-gray-700 bg-background rounded-sm absolute left-[15%] top-[30%] -translate-y-1/2 rotate-[32deg]" />
            <div class="h-[10%] aspect-[1.5/1] border-[2.5px] border-gray-700 bg-background rounded-sm absolute left-[19%] top-[30%] -translate-y-1/2 rotate-[62deg]" />
        </div>

        <div class="lamp w-2 aspect-square absolute left-[38.6%] top-[30%] rounded-lg bg-yellow-500 bg-opacity-75 z-[1]" />

        <!--rug-->
        <div class="h-[30%] aspect-square border-[2.5px] border-gray-700 bg-[#080c13] rounded-lg absolute right-[10%] bottom-[8%] -translate-y-1/2 rotate-[4deg]">
            <!--coffee table-->
            <div class="h-[60%] aspect-square border-[2.5px] border-gray-700 bg-background rounded-2xl absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-[-21deg]" />

            <!--lights-->
            <div class="lampSmaller w-1.5 aspect-square absolute left-[52%] top-[52%] -translate-y-1/2 -translate-x-1/2 rounded-lg bg-yellow-500 bg-opacity-75 z-[1]" />

            <!--chairs-->
            <div class="h-[23%] aspect-square border-[2.5px] border-gray-700 bg-background rounded-full absolute right-[23%] bottom-[-3%]" />
            <div class="h-[23%] aspect-square border-[2.5px] border-gray-700 bg-background rounded-full absolute left-[24%] top-[-2%]" />
            <div class="h-[23%] aspect-square border-[2.5px] border-gray-700 bg-background rounded-full absolute left-[-2%] bottom-[19%]" />
            <div class="h-[23%] aspect-square border-[2.5px] border-gray-700 bg-background rounded-full absolute right-[-2%] top-[21%]" />

            <!--books-->
            <div class="h-[10%] aspect-[1.5/1] border-[2.5px] border-gray-700 bg-background rounded-sm absolute left-[15%] top-[30%] -translate-y-1/2 rotate-[32deg]" />
        </div>
    </div>
</div>

<style>
    .blueGlow {
        box-shadow: 0px 0px 25px 5px rgb(30 58 138 / 0.25);
    }

    .lamp {
        box-shadow: 0px 0px 150px 75px rgb(234 179 8 / 0.15);
    }

    .lampSmaller {
        box-shadow: 0px 0px 100px 50px rgb(234 179 8 / 0.15);
    }
</style>
