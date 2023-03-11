// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

//fix type errors
declare module "*.svelte" {
    import type { ComponentType } from "svelte";
    const component: ComponentType;
    export default component;
}
