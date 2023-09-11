<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import Sponsors from '../components/home/sponsors.svelte';
	import ShootingStar from '../components/shooting-star.svelte';
	import { API_URL } from '../constants';
	import { userStore as user } from '../stores/user-store';

	import Buildings from '../components/buildings.svelte';
	import Info from '../components/home/info.svelte';
	import Schedule from '../components/home/schedule.svelte';
	import Stats from '../components/home/stats.svelte';

	let qrImg: string | null = null;
	let walletUrl: null | string = null;

	let showQR = true;

	onMount(() => {
		try {
			if ($user) {
				fetch(`${$API_URL}/attendee/qr`, {
					credentials: 'include'
				})
					.then((response) => response.text())
					.then((text) => {
						qrImg = text;
					});
				fetch(`${$API_URL}/attendee/wallet/google`, {
					credentials: 'include'
				})
					.then((response) => response.text())
					.then((text) => {
						walletUrl = text;
					});
			}
		} catch (e) {
			console.error(e);
		}
	});
</script>

<svelte:head>
	<title>Reflections | Projections 2023</title>
	<meta
		name="description"
		content="Expand your horizons at the Midwest’s largest student run tech conference this September. Join us for a week full of insightful talks from industry & academia leaders, hands-on workshops, and networking events."
	/>
</svelte:head>

<ShootingStar />
<div class="text-white flex items-center mx-3">
	<span class="w-full flex-col flex items-center">
		<img
			class="w-[80%] sm:w-3/5 {$user ? 'lg:w-1/4 mb-5' : 'lg:w-2/5 mb-10'}"
			src="/rp-text-logo-white.svg"
			alt="rp logo"
		/>
		<div
			class="text-center text-md sm:text-2xl {$user
				? 'lg:text-xl'
				: 'lg:text-3xl'} mb-5 flex flex-row whitespace-nowrap gap-1 items-center"
		>
			September 18 <Icon icon="line-md:arrow-right" /> 22
		</div>
		{#if $user}
			<div class="block w-full md:max-w-sm md:w-8/12 mx-auto mb-10" in:slide>
				<div class="bg-rp-cream px-8 pt-8 pb-5 rounded-md qr-pass flex flex-col items-center gap-2">
					{#if qrImg}
						<button
							on:click={() => {
								showQR = !showQR;
							}}
							class="w-full aspect-square"
						>
							{#if showQR}
								<img
									src={qrImg}
									class="rendering-pixelated w-full aspect-square"
									alt="QR Pass"
									in:fade
								/>
							{:else}
								<p
									class="w-full aspect-square bg-white font-semibold text-rp-blue flex items-center justify-center"
								>
									{$user.email}
								</p>
							{/if}
						</button>
					{:else}
						<div class="w-full aspect-square bg-white animate-pulse rounded-md" />
					{/if}
					{#if walletUrl}
						<a href={walletUrl} target="_blank" rel="noopener noreferrer" in:slide class="w-2/3">
							<img class="w-full aspect-auto" src="/addToWallet.png" alt="Add to Google Wallet" />
						</a>
					{/if}
				</div>
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
				href="/register"
				class="bg-rp-cream text-center p-4 lg:p-6 my-6 rounded-full hover:bg-opacity-70 duration-300"
			>
				<span class="uppercase text-black text-base md:text-xl font-semibold text-rp-gradient"
					>Register Now</span
				>
			</a>
		{/if}
		<Stats />
		<Schedule />
		<Info />
	</span>
</div>
<Sponsors />
<Buildings />

<style>
	.qr-pass {
		background-image: url('/qr-sun-bg.svg');
		background-repeat: no-repeat;
		background-size: 90%;
	}
</style>
