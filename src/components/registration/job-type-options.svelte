<script lang="ts">
	import type { jobTypeOptions } from './misc-types';

	export let formJobType: string[];

	const handleClick = (pressed: jobTypeOptions) => () => {
		if (formJobType.includes(pressed)) {
			formJobType = formJobType.filter((val) => val !== pressed);
		} else {
			formJobType = formJobType.concat(pressed);
		}
	};
</script>

<div class="flex flex-col items-start gap-2" id="jobTypeInterest">
	<label for="jobType" class="flex flex-row gap-2">
		<div>Job Type Interest</div>
		<div class="text-slate-400">(optional)</div>
	</label>
	<div class="flex flex-row w-full">
		<button
			class="flex rounded-l-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {formJobType.includes(
				'full-time'
			)
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={handleClick('full-time')}
		>
			<div>Full Time</div>
		</button>
		<button
			class="flex items-center duration-300 w-full p-3 bg-white flex-col gap-2 {formJobType.includes(
				'internship'
			)
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={handleClick('internship')}
		>
			<div>Internship</div>
		</button>
		<button
			class="flex rounded-r-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {formJobType.includes(
				'co-op'
			)
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={handleClick('co-op')}
		>
			<div>Co-Op</div>
		</button>
	</div>
</div>
