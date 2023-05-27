<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageMeta } from './page-meta.type';
	import type { boolStr } from './misc-types';
	export let page: number;
	export let pageMeta: PageMeta;
	export let formValues: any = {};

	$: isCollegeStudent = formValues?.isCollegeStudent === 'yes';
	$: numPages = Object.keys(pageMeta).length;

	$: next = pageMeta[page]['next'](isCollegeStudent);
	$: prev = pageMeta[page]['prev'](isCollegeStudent);
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
	<div class="text-slate-300">1 of {isCollegeStudent ? numPages : numPages - 1}</div>
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
