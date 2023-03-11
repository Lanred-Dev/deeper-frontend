<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import socketConnection from "$lib/socket-connection";

    onMount(() => {
        socketConnection.emit("createLobby", function (lobbyCode: string, token: string) {
            goto(`/game?lobbyCode=${lobbyCode}&token=${token}`);
        });
    });
</script>
