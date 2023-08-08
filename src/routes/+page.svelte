<script lang="ts">
	import Icon from '@iconify/svelte';
	import ShootingStar from '../components/shooting-star.svelte';
  import Sponsors from '../components/home/sponsors.svelte';
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

<div class="h-full text-white flex items-center">
	<span class="w-full">
		<h1 class="w-full text-center text-3xl sm:text-5xl lg:text-7xl mb-3 md:mb-6">reflections | projections</h1>
		<div class="text-center text-md sm:text-2xl lg:text-4xl uppercase mb-5 md:mb-10">September 18 - 22, 2023</div>
		<button class="bg-white  text-center block mx-auto p-3 lg:p-4 rounded-lg">
      <span class="uppercase text-black text-sm sm:text-md md:text-lg lg:text-xl font-semibold text-rp-gradient">Register</span>
    </button>
	</span>
</div>
<Sponsors />
