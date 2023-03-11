<script lang="ts">
    import { onMount } from "svelte";
    import { socket } from "$lib/game/scripts/shared/data";
    import animejs from "animejs";
    import * as THREE from "three";
    import fog from "vanta/dist/vanta.fog.min";
    let titleIntroContainer: HTMLElement;
    let gameTitle: HTMLElement;
    let gameTitleLetters: NodeListOf<HTMLElement>;
    let dateTitle: HTMLElement;

    function transitionTitleIntroContainerOut() {
        animejs({
            targets: titleIntroContainer,
            opacity: 0,
            easing: "linear",
            duration: 2500,
            complete: function () {
                socket.emit("gameEvent-host", "presentPlayerRoles");
            },
        });
    }

    function dateTitleTransitionOut() {
        animejs({
            targets: dateTitle,
            opacity: 0,
            easing: "linear",
            duration: 2500,
            complete: function () {
                setTimeout(transitionTitleIntroContainerOut, 1000);
            },
        });
    }

    function dateTitleTransitionIn() {
        dateTitle.style.display = "block";
        dateTitle.style.opacity = "0";

        animejs({
            targets: dateTitle,
            opacity: 1,
            easing: "linear",
            duration: 2500,
            complete: function () {
                setTimeout(dateTitleTransitionOut, 5000);
            },
        });
    }

    function gameTitleTransitionOut() {
        animejs({
            targets: gameTitleLetters,
            opacity: {
                value: 0,
                easing: "easeInOutQuart",
            },
            translateY: -100,
            easing: "easeInCubic",
            duration: 5000,
            delay: animejs.stagger(500),
            complete: function () {
                gameTitle.style.display = "none";
                setTimeout(dateTitleTransitionIn, 1000);
            },
        });
    }

    function gameTitleTransitionIn() {
        animejs({
            targets: gameTitleLetters,
            opacity: {
                value: 1,
                easing: "easeInOutExpo",
            },
            translateY: 0,
            easing: "easeOutCubic",
            duration: 5000,
            delay: animejs.stagger(500),
            complete: function () {
                setTimeout(gameTitleTransitionOut, 2500);
            },
        });
    }

    function startIntro(node: HTMLElement) {
        setTimeout(() => {
            animejs({
                targets: node,
                opacity: 1,
                easing: "linear",
                duration: 2500,
                complete: function () {
                    setTimeout(transitionTitleIntroContainerOut, 1000);
                },
            });
        }, 4000);

        return {};
    }

    onMount(() => {
        titleIntroContainer = document.querySelector(`[data-id="div_e742fe38-cefd-4b2e-a1dc-726937c2eea4"]`)!;
        gameTitle = document.querySelector(`[data-id="p_f0dbb568-1e0c-48e4-a4fb-f9f050b8d1e6"]`)!;
        gameTitle.innerHTML = gameTitle.textContent ? gameTitle.textContent.replace(/\S/g, `<span class="letter">$&</span>`) : "";
        gameTitleLetters = gameTitle.querySelectorAll(".letter");
        dateTitle = document.querySelector(`[data-id="p_42da5022-129b-4eaa-bf96-e7f1c0c9e0e3"]`)!;
        dateTitle.style.display = "none";

        gameTitleLetters.forEach((element: HTMLElement) => {
            element.style.display = "inline-block";
            element.style.position = "relative";
            element.style.opacity = "0";
            element.style.transform = "translateY(100px)";
        });

        fog({
            el: titleIntroContainer,
            THREE,
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            highlightColor: 0x131531,
            midtoneColor: 0x586593,
            lowlightColor: 0x606096,
            baseColor: 0x22224a,
            blurFactor: 0.65,
            speed: 0.9,
            zoom: 0.5,
        });
    });
</script>

<div class="w-screen h-screen absolute left-0 top-0 flex flex-col items-center justify-center px-12 select-none opacity-0" data-id="div_e742fe38-cefd-4b2e-a1dc-726937c2eea4" in:startIntro>
    <p class="text-7xl text-white" data-id="p_f0dbb568-1e0c-48e4-a4fb-f9f050b8d1e6">deeper</p>
    <p class="text-5xl text-white" data-id="p_42da5022-129b-4eaa-bf96-e7f1c0c9e0e3">9:34pm <br /> <span class="text-3xl">17 February, 2016</span></p>
</div>
