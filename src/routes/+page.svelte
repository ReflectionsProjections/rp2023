<script lang="ts">
	import Icon from '@iconify/svelte';
	import ShootingStar from '../components/shooting-star.svelte';
	import { API_URL } from '../constants';

	const getUser = async () => {
		const response = await fetch(`${$API_URL}/auth/me`, {
			credentials: 'include'
		}).catch((err) => console.log(err));

		const user = await response?.json();
		console.log('user', user);
	};

	getUser();
</script>

<div class="h-full text-white flex items-center">
	<ShootingStar />
	<span
		class="flex flex-col md:flex-row mx-auto p-2 md:p-5 md:bg-white rounded-xl md:bg-opacity-10"
	>
		<div class="flex flex-col text-2xl mx-5 my-2 md:my-5 font-serif">
			<div class="whitespace-nowrap flex flex-row">
				<div>Reflections | Projections</div>
			</div>
			<div class="text-gray-300">2023</div>
			<div class="text-xl my-3">Coming Soon</div>
		</div>
		<div class="flex flex-col mx-5 my-2 md:my-5 md:w-96 font-sans">
			<div class="text-md">
				The largest student run technology conference in the midwest, held annually at the
				University of Illinois at Urbana-Champaign.
			</div>
			<a
				href="https://2022.reflectionsprojections.org/"
				class="flex flex-row gap-2 w-fit items-center bg-white opacity-80 rounded-md py-2 px-4 my-5 hover:opacity-90 duration-200 text-rp-blue"
			>
				<div>Visit 2022 Site</div>
				<Icon icon="mdi:arrow-top-right-thin" />
			</a>
		</div>
	</span>
</div>
