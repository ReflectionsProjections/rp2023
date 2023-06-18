<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { genderOptions } from './misc-types';

	export let gender: genderOptions;

	const handleClick = (pressed: genderOptions) => () => {
		if (pressed === gender) {
			gender = 'preferNotToSay';
			return;
		}
		gender = pressed;
	};
</script>

<div id="genderDemographics" class="flex flex-col items-start gap-2">
	<label for="gender" class="flex flex-row gap-2">
		<div>Gender</div>
		<div class="text-slate-400">(optional)</div>
	</label>
	<div class="flex flex-row w-full">
		<button
			class="flex rounded-l-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {gender ===
			'male'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={handleClick('male')}
		>
			<Icon class="text-3xl" icon="mdi:human-male" />
			<div>Male</div>
		</button>
		<button
			class="flex items-center duration-300 w-full p-3 bg-white flex-col gap-2 {gender === 'female'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={handleClick('female')}
		>
			<Icon class="text-3xl" icon="mdi:human-female" />
			<div>Female</div>
		</button>
		<button
			class="flex rounded-r-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {gender ===
			'nonbinary'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={handleClick('nonbinary')}
		>
			<Icon class="text-3xl" icon="mdi:human-non-binary" />
			<div>Non-Binary</div>
		</button>
	</div>
</div>
