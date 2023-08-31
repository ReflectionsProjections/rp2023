<script lang="ts">
	import Icon from '@iconify/svelte';
	import SmartInput from '../../lib/util/smart-input.svelte';

	const gradTermOptions = ['Spring', 'Fall', 'Summer'];
	const range = [2023, 2027];

	export let expectedGradTerm: string;
	export let gradYear: number;
	export let errorTerm: string | undefined;
</script>

<SmartInput label="Expected Graduation Date" bind:error={errorTerm}>
	<div class="flex flex-col md:flex-row items-center">
		<div id="grad-term" class="flex flex-row bg-transparent rounded-md h-fit p-1">
			{#each gradTermOptions as term, idx}
				<button
					class="bg-white p-2 text-white duration-300 min-w-[4rem]
						{term === expectedGradTerm ? 'bg-opacity-30' : 'hover:bg-opacity-20 bg-opacity-10'}
						{idx == 0 ? 'rounded-l-md' : ''}
						{idx == gradTermOptions.length - 1 ? 'rounded-r-md' : ''}"
					on:click|preventDefault={() => (expectedGradTerm = term)}
				>
					{term}
				</button>
			{/each}
		</div>
		<div class="flex flex-row items-center justify-between p-2 gap-4">
			<button
				class="disabled:cursor-not-allowed disabled:bg-opacity-5 bg-white bg-opacity-10 hover:bg-opacity-20 duration-150 rounded-md p-2"
				on:click={() => (gradYear = Math.max(range[0], gradYear - 1))}
				disabled={gradYear === range[0]}><Icon icon="ic:round-minus" class="text-xl" /></button
			>
			<span>{gradYear}</span>
			<button
				class="disabled:cursor-not-allowed disabled:bg-opacity-5 bg-white bg-opacity-10 hover:bg-opacity-20 duration-150 rounded-md p-2"
				disabled={gradYear === range[1]}
				on:click={() => (gradYear = Math.min(range[1], gradYear + 1))}
				><Icon icon="ic:round-plus" class="text-xl" /></button
			>
		</div>
	</div>
</SmartInput>
