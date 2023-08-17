<script lang="ts">
	import { API_URL } from '../constants';
	import { get } from 'svelte/store';
	import Footer from '../components/footer.svelte';
	import Sponsors from '../components/home/sponsors.svelte';
	import GlassContainer from '../components/glass-container.svelte';
	import ShootingStar from '../components/shooting-star.svelte';
	import { onMount } from 'svelte';

	let qrImg: string | null = null;
	const url = get(API_URL);

	onMount(() => {
		try {
			fetch(`${url}/attendee/qr`, {
				credentials: 'include'
			})
				.then((response) => response.text())
				.then((text) => {
					qrImg = text;
				});
		} catch (e) {
			console.error(e);
		}
	});
</script>

<ShootingStar />
<div class="text-white flex items-center mx-10 xl:mx-2 my-5 xl:my-9">
	<span class="w-full flex-col flex items-center">
		<img class="w-[80%] sm:w-3/5 lg:w-2/5 mb-10" src="/rp-text-logo-white.svg" alt="rp logo" />
		<div class="text-center xl:text-center text-md sm:text-2xl lg:text-xl uppercase xl:mb-5 mb-10">
			September 18 - 22, 2023
		</div>
		<p class="w-full md:w-2/3 lg:w-1/2 text-center text-base md:text-lg font-medium text-gray-200">
			Expand your horizons at the <b class="text-pink-200"
				>Midwest’s largest student run tech conference</b
			> this September. Join us for a week full of insightful talks from industry & academia leaders,
			hands-on workshops, and networking events.
		</p>
		<button
			class="bg-rp-cream text-center p-4 lg:p-6 my-6 rounded-full hover:bg-opacity-70 duration-300"
		>
			<span class="uppercase text-black text-base md:text-xl font-semibold text-rp-gradient"
				>Register Now</span
			>
		</button>
	</span>
</div>
<section>
	<h2 class="text-white text-3xl sm:text-5xl md:text-3xl text-center mb-10 sm:mb-20">
		Your QR Code
	</h2>
	<div class="block w-8/12 max-w-sm mx-auto">
		<GlassContainer>
			<img class="w-full aspect-square" src={qrImg} alt="QR Pass" />
		</GlassContainer>
	</div>
</section>
<Sponsors />
<Footer />
