<script lang="ts">
	export let error: string | undefined = undefined;
	export let sublabel = '';
	export let label: string;
	let className: string = '';

	// creates a `class` property, even
	// though it is a reserved word
	export { className as class };
</script>

<div class="flex flex-col {className}">
	<div class="ml-1 flex flex-row flex-wrap gap-1.5 items-baseline">
		<p>{label}</p>
		<p class="text-gray-400 text-sm">{sublabel}</p>
	</div>
	<slot />
	<div class="text-red-400 ml-1 text-sm {error ? '' : 'hidden'}">
		{error}
	</div>
</div>
