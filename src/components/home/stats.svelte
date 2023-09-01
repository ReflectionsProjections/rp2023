<script lang="ts">
	import Countup from 'svelte-countup';
	import CountUp from '$lib/util/countup.svelte';

	const DURATION_MS = 1000;
</script>

<div
	class="w-[90%] md:w-4/5 lg:w-4/5 xl:w-3/5
    flex flex-row gap-5 justify-between items-center my-14 font-serif
    overflow-x-clip
    text-base sm:text-xl md:text-2xl lg:text-3xl"
>
	<div class="flex flex-col items-center">
		<CountUp start={0} end={5} duration={DURATION_MS} />
		<!-- <CountUp start={0} end={5} duration={DURATION_MS} /> -->
		<p>Days</p>
	</div>
	<div class="flex flex-col items-center">
		<span class="flex flex-row">
			<CountUp start={0} end={11} duration={DURATION_MS} />
			<p>+</p>
		</span>
		<p>Speakers</p>
	</div>
	<div class="flex flex-col items-center">
		<span class="flex flex-row">
			<CountUp start={0} end={2500} duration={DURATION_MS} step={137} />
			<p>+</p>
		</span>
		<p>Attendees</p>
	</div>
	<div class="flex flex-col items-center">
		<span class="flex flex-row">
			<CountUp start={0} end={13} duration={DURATION_MS} />
			<p>+</p>
		</span>
		<p>Companies</p>
	</div>
</div>
