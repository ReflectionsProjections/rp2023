<script lang="ts">
	import CountUp from '$lib/util/countup.svelte';

	const duration = 700;
</script>

<div
	class="w-[90%] md:w-4/5 lg:w-4/5 xl:w-3/5
    flex flex-row gap-5 justify-between items-center my-5 md:my-10 font-serif
    overflow-x-clip
    text-base sm:text-xl md:text-2xl lg:text-3xl"
>
	<div class="flex flex-col items-center">
		<CountUp start={0} end={5} {duration} />
		<p>Days</p>
	</div>
	<div class="flex flex-col items-center">
		<CountUp start={0} end={15} {duration} showPlus />
		<p>Speakers</p>
	</div>
	<div class="flex flex-col items-center">
		<CountUp start={0} end={2500} {duration} step={237} showPlus />
		<p>Attendees</p>
	</div>
	<div class="flex flex-col items-center">
		<CountUp start={0} end={10} {duration} showPlus />
		<p>Companies</p>
	</div>
</div>
