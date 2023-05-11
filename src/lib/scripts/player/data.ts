import { writable, type Writable } from "svelte/store";

export const role: Writable<string> = writable();

export const roleColorCodes: { [key: string]: string } = {
    crim: "#de0a26",
    investigator: "#FFFC31",
    owner: "#43b556",
    police: "#374f6b",
};
