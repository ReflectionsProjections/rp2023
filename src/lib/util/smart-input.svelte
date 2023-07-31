<script lang="ts">
	export let error: string | undefined = undefined;
	export let sublabel = '';
	export let label: string;
</script>

<div class="flex flex-col">
	<div class="ml-1 flex flex-row gap-2 items-baseline">
		<p>{label}</p>
		<p class="text-gray-400 text-sm">{sublabel}</p>
	</div>
	<slot />
	<div class="text-red-500 ml-1 text-sm {error ? '' : 'hidden'}">
		{error}
	</div>
</div>
