<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { firstGenOptions } from './misc-types';

	export let firstGen: firstGenOptions = 'preferNotToSay';

	const handleClick = (pressed: firstGenOptions) => () => {
		if (pressed === firstGen) {
			firstGen = 'preferNotToSay';
			return;
		}
		firstGen = pressed;
	};
</script>

<div class="flex flex-col items-start gap-2 text-sm md:text-base">
	<label for="is-first-gen" class="ml-1">Are you a first generation college student?</label>
	<div class="flex flex-row w-full">
		<button
			class="flex rounded-l-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {firstGen ===
			'yes'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={handleClick('yes')}
		>
			<div>Yes</div>
		</button>
		<button
			class="flex rounded-r-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {firstGen ===
			'no'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={handleClick('no')}
		>
			<div>No</div>
		</button>
	</div>
</div>
