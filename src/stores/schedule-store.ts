import { writable } from 'svelte/store';

export const scheduleStore = writable<{ [key: string]: any } | null>(null);
