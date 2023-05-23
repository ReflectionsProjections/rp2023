<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageMeta } from './page-meta.type';
	export let page: number;
	export let pageMeta: PageMeta;

	$: next = pageMeta[page]['next'];
	$: prev = pageMeta[page]['prev'];
</script>

<div class="flex flex-row gap-5 justify-between mx-2">
	{#if prev >= 0}
		<button
			aria-label="previous page"
			title="previous page"
			on:click={() => {
				page = prev;
			}}><Icon icon="ic:round-navigate-before" class="text-3xl text-white" /></button
		>
	{:else}
		<div />
	{/if}
	{#if next >= 0}
		<button
			aria-label="next page"
			title="next page"
			on:click={() => {
				page = next;
			}}><Icon icon="ic:round-navigate-next" class="text-3xl text-white" /></button
		>
	{/if}
</div>
