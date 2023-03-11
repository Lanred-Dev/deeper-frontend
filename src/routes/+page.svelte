<!--rework this page to a landing page and move join page to another page-->

<script lang="ts">
    import MovingStars from "$lib/components/backgrounds/moving-stars.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import animejs from "animejs";
    import throttle from "lodash.throttle";
    import socketConnection from "$lib/socket-connection";
    const scrollSensitivity: number = 50;
    let touchStart: number = 0;
    let ticking: boolean = false;
    let currentSlide: number = 0;
    let totalSlides: number = 0;
    let isFirefox: boolean;
    let isInternetExplorer: boolean;
    let landingContainer: HTMLElement;
    let landingLogoTilte: HTMLElement;
    let landingSloganTitle: HTMLElement;
    let landingSpaceWindow: HTMLElement;
    let landingContainerScrollArrows: NodeListOf<HTMLElement>;
    let lobbyContainer: HTMLElement;
    let lobbyContainerScrollArrows: NodeListOf<HTMLElement>;
    let lobbyFormLobbyCodeInput: HTMLInputElement;
    let lobbyFormUsernameInput: HTMLInputElement;
    let lobbyFormLobbyStatus: HTMLElement;

    function landingContainerOpen() {
        landingSpaceWindow.style.opacity = "0";
        landingSpaceWindow.style.transform = "rotate(25deg) scale(0.3)";
        landingLogoTilte.style.transform = "translateX(50px)";
        landingLogoTilte.style.opacity = "0";
        landingSloganTitle.style.transform = "translateX(-50px)";
        landingSloganTitle.style.opacity = "0";
        landingContainerScrollArrows.forEach((element: HTMLElement) => {
            element.style.opacity = "0";
        });
        animejs
            .timeline({})
            .add(
                {
                    targets: landingSpaceWindow,
                    duration: 1000,
                    easing: "easeOutBack",
                    opacity: 1,
                    rotate: 45,
                    scale: 1,
                },
                0
            )
            .add(
                {
                    targets: landingLogoTilte,
                    duration: 1000,
                    easing: "easeOutQuart",
                    translateX: 0,
                    opacity: 1,
                },
                0
            )
            .add(
                {
                    targets: landingSloganTitle,
                    duration: 1000,
                    easing: "easeOutQuart",
                    translateX: 0,
                    opacity: 1,
                },
                0
            )
            .add(
                {
                    targets: landingContainerScrollArrows,
                    duration: 250,
                    easing: "easeInOutSine",
                    opacity: 0.3,
                    delay: animejs.stagger(100),
                },
                500
            );
    }

    function landingContainerClose(callback: Function) {
        landingSpaceWindow.style.opacity = "1";
        landingSpaceWindow.style.transform = "rotate(45deg) scale(1)";
        landingLogoTilte.style.transform = "translateX(0px)";
        landingLogoTilte.style.opacity = "1";
        landingSloganTitle.style.transform = "translateX(0px)";
        landingSloganTitle.style.opacity = "1";
        landingContainerScrollArrows.forEach((element: HTMLElement) => {
            element.style.opacity = "0.3";
        });
        animejs
            .timeline({
                complete: function () {
                    landingContainer.style.display = "none";
                    setTimeout(callback, 100);
                },
            })
            .add(
                {
                    targets: landingSpaceWindow,
                    duration: 1000,
                    easing: "easeInOutBack",
                    opacity: 0,
                    rotate: 25,
                    scale: 0.3,
                },
                0
            )
            .add(
                {
                    targets: landingLogoTilte,
                    duration: 1000,
                    easing: "easeInOutQuart",
                    translateX: 50,
                    opacity: 0,
                },
                0
            )
            .add(
                {
                    targets: landingSloganTitle,
                    duration: 1000,
                    easing: "easeInOutQuart",
                    translateX: -50,
                    opacity: 0,
                },
                0
            )
            .add(
                {
                    targets: landingContainerScrollArrows,
                    duration: 250,
                    easing: "easeInOutSine",
                    opacity: 0,
                    delay: animejs.stagger(100),
                },
                500
            );
    }

    function lobbyContainerOpen() {
        lobbyContainerScrollArrows.forEach((element: HTMLElement) => {
            element.style.opacity = "0";
        });
        animejs.timeline().add(
            {
                targets: lobbyContainerScrollArrows,
                duration: 250,
                easing: "easeInOutSine",
                opacity: 0.3,
                delay: animejs.stagger(100),
            },
            500
        );
    }

    function lobbyContainerClose(callback: Function) {
        lobbyContainerScrollArrows.forEach((element: HTMLElement) => {
            element.style.opacity = "0.3";
        });
        animejs
            .timeline({
                complete: function () {
                    lobbyContainer.style.display = "none";
                    setTimeout(callback, 100);
                },
            })
            .add(
                {
                    targets: lobbyContainerScrollArrows,
                    duration: 250,
                    easing: "easeInOutSine",
                    opacity: 0,
                    delay: animejs.stagger(100),
                },
                500
            );
    }

    function closeCallback(slide: HTMLElement) {
        ticking = false;
        slide.style.display = "inline-block";

        if (slide == landingContainer) {
            landingContainerOpen();
        } else if (slide == lobbyContainer) {
            lobbyContainerOpen();
        }
    }

    function cycleNextSlide() {
        const previousSlide: HTMLElement = document.querySelector(`[data-id="80180ae6-df96-4268-989a-7044ac37b99b"][data-slideIndex="${currentSlide - 1}"]`)!;
        const nextSlide: HTMLElement = document.querySelector(`[data-id="80180ae6-df96-4268-989a-7044ac37b99b"][data-slideIndex="${currentSlide}"]`)!;

        if (previousSlide == landingContainer) {
            landingContainerClose(function () {
                closeCallback(nextSlide);
            });
        } else if (previousSlide == lobbyContainer) {
            lobbyContainerClose(function () {
                closeCallback(nextSlide);
            });
        }
    }

    function cyclePreviousSlide() {
        const previousSlide: HTMLElement = document.querySelector(`[data-id="80180ae6-df96-4268-989a-7044ac37b99b"][data-slideIndex="${currentSlide}"]`)!;
        const nextSlide: HTMLElement = document.querySelector(`[data-id="80180ae6-df96-4268-989a-7044ac37b99b"][data-slideIndex="${currentSlide + 1}"]`)!;

        if (nextSlide == landingContainer) {
            landingContainerClose(function () {
                closeCallback(previousSlide);
            });
        } else if (nextSlide == lobbyContainer) {
            lobbyContainerClose(function () {
                closeCallback(previousSlide);
            });
        }
    }

    function parallaxScroll(event: WheelEvent) {
        if (ticking === true) return;

        ticking = true;
        let delta: number;

        if (isFirefox === true) {
            delta = event.detail * -120;
        } else if (isInternetExplorer === true) {
            delta = -event.deltaY;
        } else {
            delta = event.deltaY;
        }

        if (delta <= -scrollSensitivity) {
            if (currentSlide <= 0) return;

            currentSlide--;
            cyclePreviousSlide();
        } else if (delta >= scrollSensitivity) {
            if (currentSlide >= totalSlides - 1) return;

            currentSlide++;
            cycleNextSlide();
        }
    }

    function checkSwipeDirection(end: number) {
        if (end < touchStart) {
            if (currentSlide <= 0) return;

            currentSlide--;
            cyclePreviousSlide();
        } else if (end > touchStart) {
            if (currentSlide >= totalSlides - 1) return;

            currentSlide++;
            cycleNextSlide();
        }
    }

    function joinLobby() {
        if (lobbyFormLobbyCodeInput.value.length > 4 || lobbyFormUsernameInput.value.length > 15) return;

        goto(`/game?lobbyCode=${lobbyFormLobbyCodeInput.value}&username=${lobbyFormUsernameInput.value}`);
    }

    function checkLobbyStatus() {
        if (lobbyFormLobbyCodeInput.value.length !== 4) {
            lobbyFormLobbyStatus.style.color = "rgb(239 68 68/var(--tw-text-opacity))";
            lobbyFormLobbyStatus.innerText = "not found";
            return;
        }

        lobbyFormLobbyStatus.style.color = "rgb(189 190 190/var(--tw-text-opacity))";
        lobbyFormLobbyStatus.innerText = "...";

        socketConnection.emit("checkLobbyCode", lobbyFormLobbyCodeInput.value, function (validCode: boolean) {
            if (validCode === true) {
                lobbyFormLobbyStatus.style.color = "rgb(34 197 94 / var(--tw-text-opacity))";
                lobbyFormLobbyStatus.innerText = "found";
                return;
            }

            lobbyFormLobbyStatus.style.color = "rgb(239 68 68/var(--tw-text-opacity))";
            lobbyFormLobbyStatus.innerText = "not found";
        });
    }

    onMount(() => {
        document.body.style.backgroundImage = "radial-gradient(circle at center center, #0f0f0f 9%, #050505 9%)";
        document.body.style.backgroundSize = "15px 15px";
        document.body.style.backgroundPosition = "center";
        isFirefox = /Firefox/i.test(navigator.userAgent);
        isInternetExplorer = /MSIE/i.test(navigator.userAgent) || /Trident.*rv\:11\./i.test(navigator.userAgent);
        landingContainer = document.querySelector(`[data-id="80180ae6-df96-4268-989a-7044ac37b99b"][data-slideIndex="0"]`)!;
        landingLogoTilte = document.querySelector(`[data-id="h1_2f1eb8d7-686b-4d5e-9ddf-d9b927a18301"]`)!;
        landingSloganTitle = document.querySelector(`[data-id="h2_38cfae8e-7aaa-4907-893b-ae7d3447a4f0"]`)!;
        landingSpaceWindow = document.querySelector(`[data-id="div_5f287088-338a-42c5-a131-e7e8c6bfdf87"]`)!;
        landingContainerScrollArrows = document.querySelectorAll(`[data-id="div_21fe2270-8ede-455b-bc01-c6d4f49dd863"] img`);
        lobbyContainer = document.querySelector(`[data-id="80180ae6-df96-4268-989a-7044ac37b99b"][data-slideIndex="1"]`)!;
        lobbyContainerScrollArrows = document.querySelectorAll(`[data-id="div_ec402af6-6a30-4880-bace-66ec0dfb326f"] img`);
        lobbyFormLobbyCodeInput = document.querySelector(`[data-id="input_b7f1a069-c21e-43f4-b2cb-cdf570874391"]`)!;
        lobbyFormUsernameInput = document.querySelector(`[data-id="input_4372c600-0472-48b7-9182-e67161319201"]`)!;
        lobbyFormLobbyStatus = document.querySelector(`[data-id="p_862404f5-d9a1-4e95-bd9c-598ee1df4034"]`)!;
        window.addEventListener(isFirefox ? "DOMMouseScroll" : "wheel", throttle(parallaxScroll, 60));

        document.addEventListener("touchstart", (event: TouchEvent) => {
            touchStart = event.changedTouches[0].screenY;
        });

        document.addEventListener("touchend", (event: TouchEvent) => {
            checkSwipeDirection(event.changedTouches[0].screenY);
        });

        //setting starting slide values
        const slides: NodeListOf<HTMLElement> = document.querySelectorAll(`[data-id="80180ae6-df96-4268-989a-7044ac37b99b"]`);
        totalSlides = slides.length;
        slides.forEach((element: HTMLElement) => {
            const slideIndex: number = parseInt(element.getAttribute("data-slideIndex")!);

            if (slideIndex === currentSlide) {
                element.style.display = "inline-block";
            } else {
                element.style.display = "none";
            }
        });
    });
</script>

<svelte:head>
    <title>deeper</title>
</svelte:head>

<section class="w-screen h-screen overflow-hidden children:w-screen children:h-screen children:px-12 children:relative children:top-0 children:left-0 children:inline-block children:overflow-hidden">
    <header data-id="80180ae6-df96-4268-989a-7044ac37b99b" data-slideIndex="0">
        <div class="w-screen h-screen absolute bottom-0 left-0 flex flex-col justify-center items-center z-[-1] overflow-hidden bg-transparent">
            <div class="w-[120vw] sm:w-[110vw] md:w-auto md:h-screen aspect-square rotate-45 bg-black rounded-3xl" data-id="div_5f287088-338a-42c5-a131-e7e8c6bfdf87">
                <div class="w-full h-full relative rounded-3xl border-[3px] border-blue-700 shadow-[0px_0px_200px_25px] shadow-blue-900/25 overflow-hidden transition-all" data-id="div_2acac068-7eb8-4d25-8341-9a066a5436e3">
                    <div class="absolute top-0 left-0 w-full h-full rounded-3xl bg-blue-400 bg-opacity-5 z-[1] backdrop-blur-sm backdrop-brightness-75" />
                    <MovingStars classes={"w-full h-full bg-black rounded-3xl"} canvasID="canvas_ddede25f-74ac-4413-846f-11c87b52faa7" starAmount={15} parallax={1} />
                </div>
            </div>
        </div>

        <div class="w-full h-full flex flex-col justify-center items-center">
            <h1 class="text-5xl mb-2" data-id="h1_2f1eb8d7-686b-4d5e-9ddf-d9b927a18301">d<span class="text-blue-600" data-id="span_c9919a52-71a6-4b60-9b70-9b5b70f5baea">ee</span>p<span class="text-blue-600" data-id="span_c9919a52-71a6-4b60-9b70-9b5b70f5baea">e</span>r</h1>
            <h2 class="text-light text-lg" data-id="h2_38cfae8e-7aaa-4907-893b-ae7d3447a4f0">Find out what happened at Mettlesome Co.</h2>
        </div>

        <button class="w-7 aspect-square absolute bottom-2 left-1/2 -translate-x-1/2 z-[1] children:w-full children:h-full children:opacity-30 children:transition-all" data-id="div_21fe2270-8ede-455b-bc01-c6d4f49dd863">
            <img src="/images/icons/white/down-arrow.svg" alt="down arrow" data-id="img_3cbdd0d0-2e06-4854-aab7-b587170ba48d" />
            <img src="/images/icons/white/down-arrow.svg" alt="down arrow" data-id="img_c70185a8-85f2-40e5-aba1-5fba8460ffe6" />
        </button>
    </header>

    <div data-id="80180ae6-df96-4268-989a-7044ac37b99b" data-slideIndex="1">
        <MovingStars classes={"w-screen h-screen absolute top-0 left-0 z-[-1] bg-transparent opacity-5"} canvasID="canvas_e58cbea7-b590-448c-a286-db2c7c425025" starAmount={15} parallax={1} />

        <button class="w-7 aspect-square absolute top-2 left-1/2 -translate-x-1/2 z-[1] children:w-full children:h-full children:opacity-30 children:transition-all" data-id="div_ec402af6-6a30-4880-bace-66ec0dfb326f">
            <img src="/images/icons/white/up-arrow.svg" alt="up arrow" data-id="img_3fafa26c-3eb9-4d8a-9e2f-38ee61aba2dd" />
            <img src="/images/icons/white/up-arrow.svg" alt="up arrow" data-id="img_68022031-5bc2-4f7f-8e50-39063ab8c14b" />
        </button>

        <section class="w-full h-full flex gap-4 flex-col items-center justify-center">
            <header class="mb-8">
                <h1 class="text-5xl mb-2">join lobby</h1>
                <h2 class="text-light text-lg">use the lobby code you were given</h2>
            </header>

            <div class="w-full md:max-w-md flex flex-col gap-5 children:w-full">
                <div class="input-primary">
                    <div>
                        <p>lobby code</p>
                        <p class="error-text" data-id="p_862404f5-d9a1-4e95-bd9c-598ee1df4034" />
                    </div>

                    <input class="lowercase" data-id="input_b7f1a069-c21e-43f4-b2cb-cdf570874391" type="text" placeholder="4-letter code" aria-label="lobby code" maxlength="4" on:input={checkLobbyStatus} />
                </div>

                <div class="input-primary">
                    <p>username</p>
                    <input data-id="input_4372c600-0472-48b7-9182-e67161319201" type="text" placeholder="your name" aria-label="your name" maxlength="15" />
                </div>

                <button class="btn-primary" on:click={joinLobby}>join</button>
            </div>
        </section>
    </div>
</section>

<style>
    [data-id="div_2acac068-7eb8-4d25-8341-9a066a5436e3"] {
        animation: div_2acac068 25s ease-out infinite;
    }

    @keyframes div_2acac068 {
        0%,
        40%,
        65%,
        100% {
            border-color: rgb(29 78 216);
            box-shadow: 0px 0px 200px 25px rgb(30 58 138 / 0.25);
        }

        44%,
        61% {
            border-color: rgb(185 28 28);
            box-shadow: 0px 0px 200px 50px rgb(127 29 29 / 0.25);
        }
    }

    [data-id="span_c9919a52-71a6-4b60-9b70-9b5b70f5baea"] {
        text-shadow: 0px 0px 10px rgb(30 58 138 / 0.75);
    }

    /* down arrows */
    [data-id="img_3cbdd0d0-2e06-4854-aab7-b587170ba48d"] {
        animation: img_3cbdd0d0 infinite 10s cubic-bezier(0.86, 0.93, 0, 1.54);
    }

    @keyframes img_3cbdd0d0 {
        0%,
        40%,
        56%,
        100% {
            transform: translateY(1rem);
        }

        50% {
            transform: translateY(0.2rem);
        }
    }

    [data-id="img_c70185a8-85f2-40e5-aba1-5fba8460ffe6"] {
        animation: img_c70185a8 infinite 10s cubic-bezier(0.86, 0.93, 0, 1.54);
    }

    @keyframes img_c70185a8 {
        0%,
        40%,
        52%,
        100% {
            transform: translateY(0rem);
        }

        50% {
            transform: translateY(-0.45rem);
        }
    }

    /* up arrows */
    [data-id="img_3fafa26c-3eb9-4d8a-9e2f-38ee61aba2dd"] {
        animation: img_3fafa26c infinite 10s cubic-bezier(0.86, 0.93, 0, 1.54);
    }

    @keyframes img_3fafa26c {
        0%,
        40%,
        52%,
        100% {
            transform: translateY(0rem);
        }

        50% {
            transform: translateY(0.45rem);
        }
    }

    [data-id="img_68022031-5bc2-4f7f-8e50-39063ab8c14b"] {
        animation: img_68022031 infinite 10s cubic-bezier(0.86, 0.93, 0, 1.54);
    }

    @keyframes img_68022031 {
        0%,
        40%,
        56%,
        100% {
            transform: translateY(-1rem);
        }

        50% {
            transform: translateY(-0.2rem);
        }
    }
</style>
