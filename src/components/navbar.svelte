<script lang="ts">
	import Icon from '@iconify/svelte';
	import { slide } from 'svelte/transition';
	import type { User } from '../lib/types';

	export let user: User | null;

	let openDropDown = false;

	const getFirstName = (fullName: string): string => {
		const trimmedName = fullName.trim();
		const names = trimmedName.split(' ');
		if (names.length > 0) {
			return names[0];
		} else {
			return fullName;
		}
	};

	let y: number;
</script>

<svelte:window bind:scrollY={y} />
<nav class="sticky block top-0 z-50">
	<div
		class="flex flex-row justify-between p-5 text-white text-sm md:text-md lg:text-lg font-sans items-center {y >
			50 && 'navbar-bg '} duration-300"
	>
		<a href="/" class="flex flex-row items-center gap-3">
			<img
				src="/favicon.png"
				alt="Reflections Projections Home Page"
				class="hover:rotate-180 duration-500 hover:scale-125 w-10 md:h-14 md:w-14 aspect-square object-cover"
			/>
		</a>
		<div class="flex flex-row justify-evenly w-[95%] md:w-2/3 lg:w-1/2 items-center">
			<a
				href="/speakers"
				class="hover:underline underline-offset-8 hover:underline-offset-4 decoration-pink-500 decoration-2 duration-150"
				>Speakers</a
			>
			<a
				href="/puzzlebang"
				class="hidden md:block hover:underline underline-offset-8 hover:underline-offset-4 decoration-pink-500 decoration-2 duration-150"
				>PuzzleBang</a
			>
			<a
				href="/mechmania"
				class="hidden md:block hover:underline underline-offset-8 hover:underline-offset-4 decoration-pink-500 decoration-2 duration-150"
				>MechMania</a
			>
			<div
				class="relative inline-block md:hidden"
				on:mouseleave|self={() => {
					openDropDown = false;
				}}
			>
				<button
					class="relative md:hidden hover:underline underline-offset-8 hover:underline-offset-4 decoration-pink-500 decoration-2 duration-150"
					on:click={() => {
						openDropDown = !openDropDown;
					}}>Special Events</button
				>
				{#if openDropDown}
					<div class="block absolute pt-1" in:slide out:slide>
						<div
							class="flex flex-col divide-y-2 bg-rp-cream rounded-lg text-rp-blue p-1 border-rp-pink"
						>
							<a class="p-1.5 hover:text-rp-dull-pink duration-200" href="/mechmania">MechMania</a>
							<a class="p-1.5 hover:text-rp-dull-pink duration-200" href="/puzzlebang">PuzzleBang</a
							>
						</div>
					</div>
				{/if}
			</div>
			{#if user}
				<div class="flex flex-row gap-3 items-center">
					<div class="hidden md:flex">
						{user?.fullName ? `Welcome, ${getFirstName(user.fullName)}` : ''}
					</div>
					<a href="/preferences">
						<Icon
							icon="fluent:person-28-filled"
							class="text-xl md:text-3xl hover:text-pink-500 duration-200"
						/>
					</a>
				</div>
			{:else}
				<a
					href="/login"
					class="hover:underline underline-offset-8 hover:underline-offset-4 decoration-pink-500 decoration-2 duration-150"
					>Log In</a
				>
			{/if}
		</div>
	</div>
</nav>

<style>
	.navbar-bg {
		background: rgb(29, 46, 91);
		background: linear-gradient(180deg, rgba(29, 46, 91, 1) 0%, rgba(255, 255, 255, 0) 100%);
	}
</style>
