<script lang="ts">
	import Icon from '@iconify/svelte';
	import ShootingStar from '../components/shooting-star.svelte';
	import { API_URL } from '../constants';

	const getUser = async () => {
		const response = await fetch(`${API_URL}/auth/me`, {
			credentials: 'include'
		}).catch((err) => console.log(err));

		const user = await response?.json();
		console.log('user', user);
	};

	getUser();
</script>

<!-- Put in tmp hero component/Replace with final-->
<div class="h-full text-white flex items-center">
	<span class="w-full">
		<h1 class="w-full text-center text-2xl sm:text-5xl lg:text-7xl mb-6">reflections | projections</h1>
		<div class="text-center text-md sm:text-2xl lg:text-4xl uppercase mb-6">September 18 - 22, 2023</div>
		<button class="uppercase bg-white text-black text-center block mx-auto text-sm md:text-md p-4">Register</button>
	</span>
</div>
