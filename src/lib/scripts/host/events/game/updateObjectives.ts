import { objectives as objectivesStore } from "$lib/scripts/host/data";

export default function updateObjectives(objectives: {[key: string]: string}) {
    objectivesStore.update(() => objectives);
}