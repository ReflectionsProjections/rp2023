<script lang="ts">
	import type { ethnicityOptions } from './misc-types';

	export let ethnicity: ethnicityOptions = null;

	const handleClick = (pressed: ethnicityOptions) => () => {
		if (pressed === ethnicity) {
			ethnicity = null;
			return;
		}
		ethnicity = pressed;
	};
</script>

<div class="flex flex-col items-start gap-2">
	<label for="gender" class="flex flex-row gap-2">
		<div>Ethnicity</div>
		<div class="text-slate-400">(optional)</div>
	</label>
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
</div>
