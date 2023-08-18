<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { User } from '../lib/types';
	import { userStore } from '../stores/user-store';

	let user: User | null;

    userStore.subscribe(data => user = data);
</script>

<span class="sticky top-0 w-full">
	<div
		class="flex flex-row justify-between p-5 lg:px-10 text-gray-200 text-md md:text-base lg:text-lg font-sans items-center"
	>
		<a href="/" class="flex flex-row items-center gap-5">
			<img
				src="/favicon.png"
				alt="Reflections Projections Home Page"
				class="hover:rotate-180 duration-500 hover:scale-125 h-[40px] w-[40px] md:h-[50px] md:w-[50px]"
			/>
			<img
				src="/rp-text-logo-white.svg"
				alt="Reflections Projections Home Page"
				width={180}
				class="hidden md:block fill-rp-pink"
			/>
		</a>
		<a
			href="/speakers"
			class="hover:underline underline-offset-8 hover:underline-offset-4 decoration-pink-500 decoration-2 duration-150"
			>Speakers</a
		>
		<a
			href="/speakers"
			class="hover:underline underline-offset-8 hover:underline-offset-4 decoration-pink-500 decoration-2 duration-150"
			>Puzzlebang</a
		>
		<a
			href="/speakers"
			class="hover:underline underline-offset-8 hover:underline-offset-4 decoration-pink-500 decoration-2 duration-150"
			>MechMania</a
		>

		{#if user}
			<div class="flex flex-row gap-3 items-center">
				<div class="hidden md:flex">{user?.fullName ? `Welcome, ${user.fullName}` : ''}</div>
				<a href="/preferences">
					<Icon
						icon="fluent:person-28-filled"
						class="text-xl md:text-3xl hover:text-pink-500 duration-200"
					/>
				</a>
			</div>
		{:else}
			<a
				href="/speakers"
				class="hover:underline underline-offset-8 hover:underline-offset-4 decoration-pink-500 decoration-2 duration-150"
				>Log In</a
			>
		{/if}
	</div>
</span>
