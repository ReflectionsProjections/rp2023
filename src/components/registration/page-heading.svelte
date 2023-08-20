<script lang="ts">
	export let title: string;
	export let subtitle: string | undefined;
</script>

<div>
	<div class="text-lg md:text-xl text-white">{title}</div>
	{#if subtitle}
		<div class="text-base text-slate-300">
			{subtitle}
		</div>
	{/if}
</div>
