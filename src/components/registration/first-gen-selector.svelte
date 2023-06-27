<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { firstGenOptions, genderOptions } from './misc-types';

	export let firstGen: firstGenOptions = 'preferNotToSay';

	const handleClick = (pressed: firstGenOptions) => () => {
		if (pressed === firstGen) {
			firstGen = 'preferNotToSay';
			return;
		}
		firstGen = pressed;
	};
</script>

<div class="flex flex-col items-start gap-2">
	<label for="is-first-gen">If you're a college student, are you first generation?</label>
	<div class="flex flex-row w-full">
		<button
			class="flex rounded-l-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {firstGen ===
			'yes'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={handleClick('yes')}
		>
			<Icon class="text-2xl" icon="icon-park-solid:one" />
			<div>I am a first generation college student</div>
		</button>
		<button
			class="flex rounded-r-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {firstGen ===
			'no'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={handleClick('no')}
		>
			<Icon class="text-2xl" icon="icon-park-solid:two" />
			<div>I am not a first generation college student</div>
		</button>
	</div>
</div>
