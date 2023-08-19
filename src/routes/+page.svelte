<script lang="ts">
	import { API_URL } from '../constants';
	import { get } from 'svelte/store';
	import Footer from '../components/footer.svelte';
	import Sponsors from '../components/home/sponsors.svelte';
	import GlassContainer from '../components/glass-container.svelte';
	import ShootingStar from '../components/shooting-star.svelte';
	import { onMount } from 'svelte';
	import { userStore } from '../stores/user-store';
	import type { User } from '../lib/types';
	import { slide } from 'svelte/transition';

	let qrImg: string | null = null;

	let user: User | null = null;
	userStore.subscribe((data) => (user = data));

	console.log(user);

	onMount(() => {
		try {
			if (user) {
				fetch(`${$API_URL}/attendee/qr`, {
					credentials: 'include'
				})
					.then((response) => response.text())
					.then((text) => {
						qrImg = text;
					});
			}
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
		{#if user}
			<div class="block w-full md:max-w-sm md:w-8/12 mx-auto" in:slide>
				<GlassContainer>
					<img class="w-full aspect-square" src={qrImg} alt="QR Pass" />
				</GlassContainer>
			</div>
		{:else}
			<p
				class="w-full md:w-2/3 lg:w-1/2 text-center text-base md:text-lg font-medium text-gray-200"
			>
				Expand your horizons at the <b class="text-pink-200"
					>Midwest’s largest student run tech conference</b
				> this September. Join us for a week full of insightful talks from industry & academia leaders,
				hands-on workshops, and networking events.
			</p>
			<a
				href="/reister"
				class="bg-rp-cream text-center p-4 lg:p-6 my-6 rounded-full hover:bg-opacity-70 duration-300"
			>
				<span class="uppercase text-black text-base md:text-xl font-semibold text-rp-gradient"
					>Register Now</span
				>
			</a>
		{/if}
	</span>
</div>
<Sponsors />
