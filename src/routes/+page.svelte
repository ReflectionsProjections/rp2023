<script>
	import Icon from '@iconify/svelte';
	import svgLogo from '../assets/rp-logo.svg';
	import ShootingStar from '../components/shooting-star.svelte';
</script>

<ShootingStar />
<div class="h-screen text-white flex items-center">
	<span class="flex flex-col md:flex-row mx-auto">
		<div class="flex flex-col text-3xl m-5 font-serif">
			<div class="whitespace-nowrap flex flex-row">
				<div>Reflections | Projections</div>
			</div>
			<div class="text-gray-300">2023</div>
			<div class="text-xl my-3">Coming Soon</div>
		</div>
		<div class="flex flex-col m-5 w-96 font-sans">
			<div class="text-lg">
				The largest student run technology conference in the midwest, held annually at the
				University of Illinois at Urbana-Champaign.
			</div>
			<a
				href="https://2022.reflectionsprojections.org/"
				class="flex flex-row gap-2 w-fit text-black items-center bg-white opacity-80 rounded-md py-2 px-4 my-5 hover:opacity-90 duration-200"
			>
				<div>Visit 2022 Site</div>
				<Icon icon="mdi:arrow-top-right-thin" />
			</a>
		</div>
	</span>
</div>
