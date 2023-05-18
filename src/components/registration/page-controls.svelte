<script lang="ts">
	import Icon from '@iconify/svelte';
	export let page: number;
	export let next: number;
	export let prev: number;
</script>

<div class="flex flex-row gap-5">
	{#if prev >= 0}
	<button
		on:click={() => {
			page = prev;
		}}><Icon icon="ic:round-navigate-before" class="text-2xl text-white" /></button
	>
	{/if}
	{#if next >= 0 }
	<button
		on:click={() => {
			page = next;
		}}><Icon icon="ic:round-navigate-next" class="text-2xl text-white" /></button
	>
	{/if}
</div>
