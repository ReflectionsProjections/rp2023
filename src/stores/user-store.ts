import { writable } from 'svelte/store';

let user: User | null = null;

export const userStore = writable(user);

