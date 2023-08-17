<script lang="ts">
	import SmartInput from '../../lib/util/smart-input.svelte';

	export let major: string = '';
	export let majorOther: string;
	export let errorMajor: string | undefined;
	export let errorMajorOther: string | undefined;

	const csPlusXs = [
		// { displayName: 'CS + Philosophy', id: 'cs+phil' },
		{ displayName: 'CS + X', id: 'cs+x' },
		{ displayName: 'CS + Math', id: 'cs+math' },
		{ displayName: 'CS + Linguistics', id: 'cs+ling' },
		{ displayName: 'CS + Music', id: 'cs+music' },
		{ displayName: 'CS + Advertising', id: 'cs+adv' }
	];
</script>

<SmartInput label="Major" error={errorMajorOther || errorMajor}>
	<span class="flex flex-row items-stretch">
		<div class="flex flex-grow-[1] flex-col">
			<button
				class="flex-grow-[1] rounded-t-md duration-300 p-2 md:p-3 bg-white
				{major === 'cs' ? 'bg-opacity-30' : 'bg-opacity-10 hover:bg-opacity-20'}"
				on:click={() => (major = 'cs')}
			>
				Computer Science
			</button>
			<button
				class="flex-grow-[1] duration-300 p-3 bg-white break-words
				{major === 'ece' ? 'bg-opacity-30' : 'bg-opacity-10 hover:bg-opacity-20'}"
				on:click={() => (major = 'ece')}
				>Electrical & Computer Engineering
			</button>

			<select
				on:change|capture={(evt) => (major = evt.target?.value || '')}
				class="flex-grow-[1] duration-300 p-3 bg-white
					text-center appearance-none
					{major.startsWith('cs+') ? 'bg-opacity-30' : 'bg-opacity-10 hover:bg-opacity-20'}"
			>
				{#each csPlusXs as csPlusX}
					<option value={csPlusX.id} class="bg-rp-dull-pink p-1.5 text-gray-200 flex flex-row">
						{csPlusX.displayName}
					</option>
				{/each}
			</select>

			<div
				class="flex flex-col flex-grow-[1] rounded-b-md justify-center duration-300 p-3 bg-white
				{major === majorOther ? 'bg-opacity-30' : 'bg-opacity-10 hover:bg-opacity-20'}"
			>
				<input
					class="bg-transparent border border-gray-200 rounded-md h-fit p-1 placeholder-gray-200 text-center"
					type="text"
					placeholder="Other Major"
					id="other"
					on:click|preventDefault={() => (major = 'other')}
					bind:value={majorOther}
				/>
			</div>
		</div>
	</span>
</SmartInput>
