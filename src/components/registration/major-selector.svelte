<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { majorOptions } from './misc-types';

	export let formMajor: string;
	export let majorOther: string;

	const csPlusXs = [
		
		{ displayName: 'CS + X', id: 'cs+x' },
		{ displayName: 'CS + Statistics', id: 'cs+stats' },
		{ displayName: 'CS + Math', id: 'cs+math' },
		{ displayName: 'CS + Economics', id: 'cs+econ' },
		{ displayName: 'CS + Linguistics', id: 'cs+ling' },
		{ displayName: 'CS + Philosophy', id: 'cs+phil' },
		{ displayName: 'CS + Astronomy', id: 'cs+astro' },
		{ displayName: 'CS + Music', id: 'cs+music' },
		{ displayName: 'CS + Advertising', id: 'cs+adv' },
		{ displayName: 'CS + Crop Sciences', id: 'cs+cropsci' },
		{ displayName: 'CS + GIS', id: 'cs+gis' },
		{ displayName: 'CS + Chemistry', id: 'cs+chem' },
		{ displayName: 'CS + Antropology', id: 'cs+anthro' },
		{ displayName: 'CS + Physics', id: 'cs+phys' },
		{ displayName: 'CS + Bioengineering', id: 'cs+bioe' },
		{ displayName: 'CS + Education', id: 'cs+edu' },
		{ displayName: 'CS + Animal Sciences', id: 'cs+anisci' },
		

	];
</script>

<div class="flex flex-col">
	<div class="ml-1">Major</div>
	<span class="flex flex-row items-stretch">
		<div class="flex flex-grow-[1] flex-col">
			<button
				class="flex-grow-[1] rounded-t-md duration-300 p-2 md:p-3 bg-white
                {formMajor === 'cs' ? 'bg-opacity-30' : 'bg-opacity-10 hover:bg-opacity-20'}"
				on:click={() => (formMajor = 'cs')}
			>
				Computer Science
			</button>
			<button
				class="flex-grow-[1] duration-300 p-3 bg-white break-words
                {formMajor === 'ece' ? 'bg-opacity-30' : 'bg-opacity-10 hover:bg-opacity-20'}"
				on:click={() => (formMajor = 'ece')}
				>Electrical & Computer Engineering
			</button>

			<select
				on:change|capture={(evt) => (formMajor = evt.target?.value || '')}
				class="flex-grow-[1] duration-300 p-3 bg-white
                    text-center appearance-none
                    {formMajor.startsWith('cs+')
					? 'bg-opacity-30'
					: 'bg-opacity-10 hover:bg-opacity-20'}"
			>
				{#each csPlusXs as csPlusX}
					<option value={csPlusX.id} class="bg-rp-dull-pink p-1.5 text-gray-200 flex flex-row">
						{csPlusX.displayName}
					</option>
				{/each}
			</select>

			<div
				class="flex flex-col flex-grow-[1] rounded-b-md justify-center duration-300 p-3 bg-white
				{formMajor === majorOther ? 'bg-opacity-30' : 'bg-opacity-10 hover:bg-opacity-20'}"
			>
				<input
					class="bg-transparent border border-gray-200 rounded-md h-fit p-1 placeholder-gray-200 text-center"
					type="text"
					placeholder="Other Major"
					id="other"
					on:change={() => (formMajor = majorOther)}
					bind:value={majorOther}
				/>
			</div>
		</div>
	</span>
</div>
