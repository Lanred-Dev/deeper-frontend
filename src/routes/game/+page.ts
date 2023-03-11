/** @type {import('./$types').PageLoad} */
export function load({ url }: any) {
    return {
        lobbyHost: url.searchParams.get("token") !== null,
        token: url.searchParams.get("token") || undefined,
        lobbyCode: url.searchParams.get("lobbyCode"),
        username: url.searchParams.get("token") === null ? url.searchParams.get("username") : "",
    };
}
