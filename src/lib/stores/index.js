import { writable } from 'svelte/store';

export let current_page = writable('/');
export let show_modal_chat = writable(false);
export let show_modal_task = writable(false);
export let show_loader_chat_cs = writable(false);
