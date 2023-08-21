<script lang="ts">
	import Icon from '@iconify/svelte';
	import GlassContainer from '../../components/glass-container.svelte';
</script>

<main class="w-full md:w-2/3 lg:w-1/2 mx-auto">
	<GlassContainer>
		<div class="flex flex-col gap-5">
			<h1 class="text-2xl text-white font-serif">Staff Dashboard</h1>

			<div class="flex flex-row items-center text-gray-200 gap-5 flex-wrap">
				<a
					href="/dash/events"
					class="flex flex-row gap-2 justify-center items-center text-lg md:text-xl w-60 p-2 h-20 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md duration-200"
				>
					<Icon icon="ic:outline-event" class="text-xl md:text-3xl" />
					<p>Events Dashboard</p>
				</a>
				<a
					href="/dash/access"
					class="flex flex-row gap-2 justify-center items-center text-lg md:text-xl w-60 p-2 h-20 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md duration-200"
				>
					<Icon icon="eos-icons:role-binding" class="text-xl md:text-3xl" />
					<p>Access Dashboard</p>
				</a>
			</div>
		</div>
	</GlassContainer>
</main>
