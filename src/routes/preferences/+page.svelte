<script>
	import GlassContainer from '../../components/glass-container.svelte';
	import JobTypeOptions from '../../components/registration/job-type-options.svelte';

	const formValues = {
		jobTypeInterest: [],
		portfolioLink: ''
	};

	$: console.log(formValues);

	let submitted = false;

	let error = '';

	const onSubmit = async () => {
		const response = await fetch('http://localhost:3000/preferences', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formValues)
		});

		submitted = true;
		console.log(response); //For debugging. After clicking submit, should be able to see the request in console
	};
</script>

<main class="flex h-full">
	<form class="mx-auto my-auto w-[90%] md:w-3/5 lg:w-2/5 text-gray-200 accent-rp-pink">
		<GlassContainer>
			<div class="flex flex-col gap-5 mb-3">
				<div class="flex flex-col items-start">
					<label for="resume">Upload your Resume Here</label>
					<input
						type="file"
						name="resume"
						accept="application/pdf, application/msword, .doc, .docx"
						class="bg-rp-dull-pink border border-gray-400 rounded-md h-fit"
					/>
				</div>

				<JobTypeOptions bind:formJobType={formValues.jobTypeInterest} />

				<div class="flex flex-col items-start">
					<label for="portfolio"
						>Portfolio Link/LinkedIn (If you have multiple links, separate each link with a comma)</label
					>
					<input
						class="bg-rp-dull-pink border border-gray-400 rounded-md h-fit w-full"
						type="url"
						bind:value={formValues.portfolioLink}
					/>
				</div>
			</div>
			<button
				type="submit"
				class="mx-auto disabled:opacity-25 disabled:cursor-not-allowed duration-500 bg-white bg-opacity-30 text-white px-3 py-2 m-3 rounded-md flex gap-2 border border-white"
				on:click={onSubmit}
			>
				Submit
			</button>

			{#if submitted}
				Thank you for your interest in Reflections | Projections 2023! Please check your email for
				additional information.
			{/if}
		</GlassContainer>
	</form>
</main>
