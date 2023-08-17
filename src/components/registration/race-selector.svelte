<script lang="ts">
	import SmartInput from '../../lib/util/smart-input.svelte';
	import type { raceOptions } from './misc-types';

	const raceOptions: { raceId: raceOptions; displayText: string }[] = [
		{ raceId: 'americanIndianOrAlaska', displayText: 'American Indian / Alaska Native' },
		{ raceId: 'eastAsian', displayText: 'East Asian' },
		{ raceId: 'southAsian', displayText: 'South Asian' },
		{ raceId: 'black', displayText: 'Black or African-American' },
		{ raceId: 'pacificIslander', displayText: 'Pacific Islander' },
		{ raceId: 'white', displayText: 'White / Caucasian' }
	];
	export let formRace: string[];
	export let formRaceOther: string | null;
	export let raceOtherError: string | undefined;
</script>

<div class="flex flex-col items-start gap-2" id="raceDemographics">
	<label for="gender" class="flex flex-row gap-2">
		<div>Race</div>
		<div class="text-slate-400">(optional)</div>
	</label>
	<div class="flex flex-row flex-wrap">
		{#each raceOptions as { raceId, displayText }, i}
			<button
				id={raceId}
				on:click={() => {
					if (formRace.includes(raceId)) {
						formRace = formRace.filter((val) => val !== raceId);
					} else {
						formRace = formRace.concat(raceId);
					}
				}}
				class="w-1/2 duration-300 text-center bg-white p-3 {formRace.includes(raceId)
					? 'bg-opacity-40'
					: 'bg-opacity-10 hover:bg-opacity-20'}
					{i == 0 ? 'rounded-tl-md' : ''}
					{i == 1 ? 'rounded-tr-md' : ''}
					{i == 4 ? 'rounded-bl-md' : ''}
					{i == 5 ? 'rounded-br-md' : ''}
					"
			>
				{displayText}</button
			>
		{/each}
	</div>
	<SmartInput label="Other Race" sublabel="(optional)" error={raceOtherError}>
		<input
			class="bg-transparent border border-gray-400 rounded-md h-fit"
			type="text"
			id="other"
			bind:value={formRaceOther}
		/>
	</SmartInput>
</div>
