<script lang="ts">
    import type { jobTypeOptions } from "./misc-types";

    const jobTypeOptions: {jobTypeId: jobTypeOptions; displayText: string}[] = [
        { jobTypeId: 'full-time', displayText: 'Full Time' },
        { jobTypeId: 'internship', displayText: 'Internship' },
        { jobTypeId: 'co-op', displayText: 'Co-Op' }
    ];
    export let formJobType: string[];
</script>

<div class="flex flex-col items-start gap-2" id="jobTypeInterest">
	<label for="jobType" class="flex flex-row gap-2">
		<div>Job Type Interest</div>
		<div class="text-slate-400">(optional)</div>
	</label>
	<div class="flex flex-row">
		{#each jobTypeOptions as { jobTypeId, displayText }}
			<button
				id={jobTypeId}
				on:click={() => {
					if (formJobType.includes(jobTypeId)) {
						formJobType = formJobType.filter((val) => val !== jobTypeId);
					} else {
						formJobType = formJobType.concat(jobTypeId);
					}
				}}
				class="w-1/2 duration-300 text-center bg-white p-3 {formJobType.includes(jobTypeId)
					? 'bg-opacity-40'
					: 'bg-opacity-10 hover:bg-opacity-20'}"
			>
				{displayText}</button
			>
		{/each}
	</div>
</div>