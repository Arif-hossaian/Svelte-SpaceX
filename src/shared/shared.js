import { writable } from 'svelte/store';

export const sharedState = writable(null);

export const updatedData = writable([]);
