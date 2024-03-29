<script lang="ts">
	import { onMount } from 'svelte';
	import GlassContainer from '../../components/glass-container.svelte';
	import JobTypeOptions from '../../components/registration/job-type-options.svelte';
	import { API_URL } from '../../constants';
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';

	const formValues = {
		jobTypeInterest: [],
		portfolioLink: null
	};
	let submitted = false;

	let fileData: File;
	let errors: string[] | null = null;

	const handleFileInput = (_event: Event) => {
		var fileInput = document.getElementById('resume-upload') as HTMLInputElement | null;
		var file = fileInput?.files?.[0];

		if (file) {
			fileData = file;
		}
	};

	const onSubmit = async () => {
		errors = [];
		if (fileData) {
			const formData = new FormData();
			formData.append('file', fileData);

			const response = await fetch(`${$API_URL}/attendee/upload`, {
				method: 'POST',
				cache: 'no-cache',
				credentials: 'include',
				body: formData
			});

			if (!response.ok) {
				const res = await response.json();
				const message = res.message;
				errors = Array.isArray(message) ? message : [message];
				submitted = false;
			}
		}
		const response = await fetch(`${$API_URL}/attendee/preferences`, {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formValues)
		});

		if (response.ok) {
			submitted = true;
		} else {
			const res = await response.json();
			const message = res.message;
			errors = Array.isArray(message) ? message : [message];
			submitted = false;
		}
	};

	onMount(async () => {
		const response = await fetch(`${$API_URL}/attendee/preferences`, {
			credentials: 'include'
		});

		if (!response.ok) {
			const res = await response.json();
			console.error(res);
			const message = res.message;
			errors = Array.isArray(message) ? message : [message];
			submitted = false;
		} else {
			const preferences = await response.json();
			formValues.jobTypeInterest = preferences.jobTypeInterest;
			formValues.portfolioLink = preferences.portfolioLink;
		}
	});

	let logoutMessage: { message: any; success?: boolean } | null = null;

	const logout = async () => {
		const response = await fetch(`${$API_URL}/auth/logout`, {
			method: 'POST',
			credentials: 'include'
		});

		if (response.ok) {
			logoutMessage = {
				success: true,
				message: "Done! We'll redirect you back to the home page."
			};
			setTimeout(() => (window.location.href = '/'), 1000);
		}
		const res = await response.json();
		logoutMessage = {
			message: response.statusText,
			success: false
		};
	};
</script>

<main class="flex flex-col items-center h-full gap-5">
	<div class="font-serif text-3xl text-white mt-10">Preferences</div>
	<div class="text-base text-slate-300 text-center mx-3">
		Add new or update existing resumes, job interest preferences, and relevant links.
	</div>
	<form class="w-[90%] md:w-3/5 lg:w-2/5 text-gray-200 accent-rp-pink">
		<GlassContainer>
			<div class="flex flex-col gap-5 mb-3">
				<div class="flex flex-col items-start">
					<label for="resume">Upload your Resume Here</label>
					<input
						type="file"
						name="file"
						id="resume-upload"
						accept="application/pdf, application/msword, .doc, .docx"
						class="block w-full
						text-gray-200 file:text-white
						file:mr-4 file:py-2 file:px-4
						file:rounded-full file:border-0
						file:bg-white file:bg-opacity-10
						file:hover:bg-opacity-20 hover:file:bg-violet-100
						file:duration-300"
						on:change={handleFileInput}
					/>
				</div>

				<JobTypeOptions bind:formJobType={formValues.jobTypeInterest} />

				<div class="flex flex-col items-start">
					<label for="portfolio"
						>Portfolio Link/LinkedIn (If you have multiple links, separate each link with a comma)</label
					>
					<input
						class="bg-transparent border border-gray-400 rounded-md p-1 h-fit w-full"
						type="text"
						bind:value={formValues.portfolioLink}
						placeholder={formValues.portfolioLink}
					/>
				</div>
			</div>
			<button
				class="px-3 py-2 m-3 rounded-md bg-rp-cream hover:bg-gray-300 duration-300 text-rp-blue"
				on:click={onSubmit}
			>
				Submit
			</button>
			{#if errors && errors.length > 0}
				<div class="text-red-500">
					{#each errors as error}
						<p>{error}</p>
					{/each}
				</div>
			{:else if submitted}
				<div class="text-green-500">Success! Preferences saved successfully.</div>
			{/if}
		</GlassContainer>
	</form>
	<div class="flex flex-col gap-2 z-50">
		<button
			on:click={logout}
			class="bg-rp-blue p-2 rounded-md text-gray-200 hover:bg-opacity-100 bg-opacity-80"
			>Sign me out</button
		>
		{#if logoutMessage}
			<p class={logoutMessage.success ? 'text-green-300' : 'text-red-300'} in:slide>
				{logoutMessage.message}
			</p>
		{/if}
	</div>
</main>
