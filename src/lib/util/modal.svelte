<script lang="ts">
	import Icon from '@iconify/svelte';

	export let show: boolean;
</script>

<div
	class="bg-gray-900 w-11/12 md:w-9/12 rounded-lg fixed z-[999] p-5 duration-300 text-gray-200 center-div overflow-y-auto {show
		? 'visible opacity-100'
		: 'invisible opacity-0'} max-h-screen"
>
	<button on:click={() => (show = false)} class="absolute right-4 text-2xl text-red-500">
		<Icon icon="mingcute:exit-fill" />
	</button>
	<slot />
</div>

<style>
	.center-div {
		top: 35%;
		left: 50%;
		transform: translate(-50%, -35%);
	}
</style>
