<script lang="ts">
	import SmartInput from '../../lib/util/smart-input.svelte';

	const referralOptions = [
		{ referralId: 'ACMOH', displayText: 'ACM Open House' },
		{ referralId: 'buildingAds', displayText: 'Building Ads' },
		{ referralId: 'courses', displayText: 'School Course' },
		{ referralId: 'instagram', displayText: 'Instagram' },
		{ referralId: 'email', displayText: 'E-mail' },
		{ referralId: 'posters', displayText: 'Posters/Flyers' },
		{ referralId: 'website', displayText: 'Website' },
		{ referralId: 'word-of-mouth', displayText: 'Word of Mouth' }
	];

	export let marketing: string[];
	export let marketingOther: string | null;
	export let marketingOtherError: string | undefined;

	$: console.log(marketing);
</script>

<div>
	<label for="marketing" class="mb-2">I heard about R|P from... </label>
	<div class="flex flex-row flex-wrap">
		{#each referralOptions as { referralId, displayText }, i}
			<button
				id={referralId}
				on:click={() => {
					if (marketing.includes(referralId)) {
						marketing = marketing.filter((val) => val !== referralId);
					} else {
						marketing = marketing.concat(referralId);
					}
				}}
				class="w-1/2 duration-300 text-center bg-white p-3 {marketing.includes(referralId)
					? 'bg-opacity-40'
					: 'bg-opacity-10 hover:bg-opacity-20'}
                        {i == 0 ? 'rounded-tl-md' : ''}
                        {i == 1 ? 'rounded-tr-md' : ''}
                        {i == 6 ? 'rounded-bl-md' : ''}
                        {i == 7 ? 'rounded-br-md' : ''}
                        "
			>
				{displayText}</button
			>
		{/each}
	</div>
	<SmartInput label="Other" bind:error={marketingOtherError}>
		<input
			class="bg-transparent border border-gray-400 rounded-md h-fit p-1"
			type="text"
			id="marketing-other"
			bind:value={marketingOther}
		/>
	</SmartInput>
</div>
