<script lang="ts">
	import SmartInput from '../../lib/util/smart-input.svelte';
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
	<SmartInput label="Job Type Interest" sublabel="(multiple)" class="w-full">
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
	</SmartInput>
</div>
