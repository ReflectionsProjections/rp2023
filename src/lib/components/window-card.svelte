<script>
	import Icon from '@iconify/svelte';
</script>

<div class="flex flex-col md:my-10 bg-rp-cream text-rp-blue p-2 w-full rounded-sm">
	<div class="flex flex-row items-center">
		<div class="border border-rp-blue w-full h-4 m-0.5" />
		<div class="flex flex-row text-rp-blue">
			<div class="w-4 h-4 m-0.5 border border-rp-blue flex items-center justify-center">
				<Icon icon="ic:baseline-minimize" />
			</div>
			<div class="w-4 h-4 m-0.5 border border-rp-blue flex items-center justify-center">
				<Icon icon="fluent:maximize-20-filled" />
			</div>
			<div class="w-4 h-4 m-0.5 border border-rp-blue flex items-center justify-center">
				<Icon icon="ph:x-bold" />
			</div>
		</div>
	</div>

	<slot />
</div>
