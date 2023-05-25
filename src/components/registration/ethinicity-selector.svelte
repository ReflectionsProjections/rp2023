<script lang="ts">
	import type { ethnicityOptions } from './misc-types';

	export let ethnicity: ethnicityOptions = 'preferNotToSay';

	const handleClick = (pressed: ethnicityOptions) => () => {
		if (pressed === ethnicity) {
			ethnicity = 'preferNotToSay';
			return;
		}
		ethnicity = pressed;
	};
</script>

<div class="flex flex-row w-full">
	<button
		class="flex rounded-l-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {ethnicity ===
		'hispanicOrLatino'
			? 'bg-opacity-40'
			: 'bg-opacity-10 hover:bg-opacity-20'}"
		on:click={handleClick('hispanicOrLatino')}
	>
		<div>Hispanic</div>
	</button>
	<button
		class="flex rounded-r-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {ethnicity ===
		'notHispanicOrLatino'
			? 'bg-opacity-40'
			: 'bg-opacity-10 hover:bg-opacity-20'}"
		on:click={handleClick('notHispanicOrLatino')}
	>
		<div>Non-Hispanic</div>
	</button>
</div>
