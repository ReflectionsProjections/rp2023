<script>
	const sponsors = [['state-farm'], ['forcepoint']];
	import Buildings from '../building-background.svelte';
</script>

<div class="w-full py-28 px-10 lg:py-40">
	<h2 class="text-white text-xl md:text-2xl lg:text-4xl text-center mb-10 sm:mb-20">
		Our Sponsors
	</h2>
	<div
		class="w-full sm:w-3/4 xl:w-5/8 max-w-4xl mx-auto flex justify-center items-center mb-10 sm:mb-20"
	>
		{#each sponsors[0] as sponsor}
			<img class="w-6/12" src="logos/{sponsor}.png" alt="{sponsor} logo" />
		{/each}
	</div>
	<div class="w-3/4 sm:w-1/2 xl:w-3/8 max-w-2xl mx-auto flex justify-around items-center">
		{#each sponsors[1] as sponsor}
			<img class="w-4/12" src="logos/{sponsor}.png" alt="{sponsor} logo" />
		{/each}
	</div>
</div>
<!-- <div class="absolute bottom-0">
	<Buildings/>
</div> -->