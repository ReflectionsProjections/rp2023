<script lang="ts">
	import { onMount } from 'svelte';

	export let start: number = 0;
	export let end: number;
	export let duration: number = 1000;
	export let step: number = 1;
	export let showPlus: boolean = false;

	let value: number;

	const increment = () => {
		value = value + step;
		if (value < end) {
			const dur = duration / ((end - start) / step);
			setTimeout(increment, dur);
		} else {
			value = end;
		}
	};

	onMount(() => {
		value = start;
		setTimeout(increment, 300);
	});
</script>

<p>
	{`${value}${showPlus ? '+' : ''}`}
</p>
