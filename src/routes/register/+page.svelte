<script lang="ts">
	import GlassContainer from '../../components/glass-container.svelte';
	import DietaryOptions from '../../components/registration/dietary-options.svelte';
	import DynamicEmail from '../../components/registration/dynamic-email.svelte';
	import EthinicitySelector from '../../components/registration/ethinicity-selector.svelte';
	import FirstGenSelector from '../../components/registration/first-gen-selector.svelte';
	import GenderSelector from '../../components/registration/gender-selector.svelte';
	import IsCollegeStudent from '../../components/registration/is-college-student.svelte';
	import type {
		boolStr,
		ethnicityOptions,
		firstGenOptions,
		genderOptions,
		raceOptions,
		unanswered
	} from '../../components/registration/misc-types';
	import PageControls from '../../components/registration/page-controls.svelte';
	import type { PageMeta } from '../../components/registration/page-meta.type';

	const formValues = {
		name: '',
		email: '',
		isCollegeStudent: 'yes' as boolStr,
		isUIUCStudent: 'yes' as boolStr,
		major: '',
		collegeName: '',
		expectedGradTerm: '',
		expectedGradYear: '',
		// occupation: '',
		age: '',
		gender: 'preferNotToSay' as genderOptions,
		ethnicity: 'preferNotToSay' as ethnicityOptions,
		race: [] as raceOptions[],
		raceOther: '',
		firstGen: 'preferNotToSay' as firstGenOptions,
		food: '',
		//foodOther: '',
		//resumeSharePerms: '',
		jobTypeInterest: [],
		portfolioLink: '',
		mechPuzzle: [],
		marketing: [],
		marketingOther: ''
	};
	let page = 0;

	const referralOptions = [
		{ referralId: 'ACMOH', displayText: 'ACM Open House' },
		{ referralId: 'ACMN', displayText: 'ACM Newsletter' },
		{ referralId: 'buildingAds', displayText: 'Building Ads' },
		{ referralId: 'courses', displayText: 'School Course' },
		{ referralId: 'WCS', displayText: 'WCS Newsletter' },
		{ referralId: 'csNewsletter', displayText: 'CS Department Newsletter' },
		{ referralId: 'instagram', displayText: 'Instagram' },
		{ referralId: 'facebook', displayText: 'Facebook' },
		{ referralId: 'twitter', displayText: 'Twitter' },
		{ referralId: 'linkedin', displayText: 'LinkedIn' },
		{ referralId: 'email', displayText: 'E-mail' },
		{ referralId: 'posters', displayText: 'Posters/Flyers' },
		{ referralId: 'quadDay', displayText: 'Quad Day' },
		{ referralId: 'eNight', displayText: 'E-Night' },
		{ referralId: 'website', displayText: 'Website' },
		{ referralId: 'slack', displayText: 'Slack' },
		{ referralId: 'discord', displayText: 'Discord' },
		{ referralId: 'word-of-mouth', displayText: 'Word of Mouth' }
	];

	const raceOptions: { raceId: raceOptions; displayText: string }[] = [
		{ raceId: 'americanIndianOrAlaska', displayText: 'American Indian / Alaska Native' },
		{ raceId: 'eastAsian', displayText: 'East Asian' },
		{ raceId: 'southAsian', displayText: 'South Asian' },
		{ raceId: 'black', displayText: 'Black or African-American' },
		{ raceId: 'pacificIslander', displayText: 'Pacific Islander' },
		{ raceId: 'white', displayText: 'White / Caucasian' }
	];

	const extraEventOptions = [
		{ extraEventId: 'mechmania', displayText: 'MechMania' },
		{ extraEventId: 'puzzlebang', displayText: 'PuzzleBang' }
	];

	const gradYearOptions = [
		{ gradYearId: '2023', displayText: '2023'},
		{ gradYearId: '2024', displayText: '2024'},
		{ gradYearId: '2025', displayText: '2025'},
		{ gradYearId: '2026', displayText: '2026'},
		{ gradYearId: '2027', displayText: '2027'}
	];

	const gradTermOptions = [
		{ gradTermId: 'Fall', displayText: 'Fall' },
		{ gradTermId: 'Spring', displayText: 'Spring' },
		{ gradTermId: 'Summer', displayText: 'Summer' }
	];

	const pageMeta: PageMeta = {
		0: {
			title: 'Welcome to R | P',
			next: (isCollegeStudent) => (isCollegeStudent ? 1 : 4),
			prev: () => -1
		},
		1: {
			title: 'Academics',
			next: () => 4,
			prev: () => 0
		},
		4: {
			title: 'Demographics',
			next: () => 5,
			prev: (isCollegeStudent) => (isCollegeStudent ? 1 : 0)
		},
		5: {
			title: 'Dietary Restrictions',
			next: () => 6,
			prev: () => 4
		},
		6: {
			title: 'Recruitment',
			next: () => 7,
			prev: () => 5
		},
		7: {
			title: 'Special Events',
			next: () => 8,
			prev: () => 6
		},
		8: {
			title: 'One Last Step',
			next: () => -1,
			prev: () => 7
		}
	};

	$: console.log(formValues);

	let submitted = false;

	const onSubmit = async () => {
		const response = await fetch('http://localhost:3000/attendee', {
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
	<form class="mx-auto my-auto w-[90%] md:w-3/5 lg:w-2/5 text-gray-200 accent-rp-pink" id="form">
		{#if page == 0}
			<GlassContainer>
				<div class="flex flex-col gap-5 mb-3">
					<div>
						<div class="text-lg md:text-xl text-white">{pageMeta[page].title}</div>
						<div class="text-base text-slate-300">
							We're glad you made it. Sign up here to receive your conference passes.
						</div>
					</div>
					<div class="flex flex-col items-start">
						<label for="name">Full Name</label>
						<input
							id="name"
							bind:value={formValues.name}
							required
							class="bg-transparent border border-gray-400 rounded-md h-fit w-full"
							autocomplete="off"
						/>
					</div>

					<IsCollegeStudent
						bind:isCollegeStudent={formValues.isCollegeStudent}
						bind:isUIUCStudent={formValues.isUIUCStudent}
						bind:collegeName={formValues.collegeName}
					/>

					<DynamicEmail bind:email={formValues.email} uiucStudent={formValues.isUIUCStudent} />
				</div>
				<PageControls {formValues} bind:page {pageMeta} />
			</GlassContainer>
		{/if}

		{#if page == 1}
			<GlassContainer>
				<div class="flex flex-col gap-5 mb-3">
					<div class="text-xl text-white">{pageMeta[page].title}</div>
					<div class="flex flex-row items-start">
						<label for="exp-grad-date">Expected Graduation Date: </label>
						<select name="exp-grad-term" id="grad-term" bind:value={formValues.expectedGradTerm} class="bg-transparent border border-gray-400 rounded-md h-fit">
							{#each gradTermOptions as { gradTermId, displayText }}
								<option
									class="w-1/2 duration-300 bg-transparent p-3"
									value={gradTermId}>{displayText}
								</option>
							{/each}
						</select>
						
						<!-- <select name="exp-grad-year" id="grad-year" bind:value={formValues.expectedGradYear} class="bg-transparent border border-gray-400 rounded-md h-fit">
							{#each gradYearOptions as { gradYearId, displayText }}
								<option
									class="w-1/2 duration-300 bg-transparent p-3"
									value={gradYearId}>{displayText}
								</option>
							{/each}
						</select> -->

						<div class="counter">
							<button on:click={() => {
								if (!formValues.expectedGradYear || formValues.expectedGradYear == "2023") {
									formValues.expectedGradYear = "2023";
								} else {
									formValues.expectedGradYear = (parseInt(formValues.expectedGradYear) - 1).toString();
								}
							}}>-</button>
							{#if !formValues.expectedGradYear}
								<span>2023</span>
							{:else}
								<span>{formValues.expectedGradYear}</span>
							{/if}
							<button on:click={() => {
								if (!formValues.expectedGradYear) {
									formValues.expectedGradYear = "2024";
								} else if (formValues.expectedGradYear == "2027") {
									formValues.expectedGradYear = "2027";
								} else {
									formValues.expectedGradYear = (parseInt(formValues.expectedGradYear) + 1).toString();
								}
							}}>+</button>
						</div>
					</div>

					<div class="flex flex-col items-start">
						<label for="major">Major</label>
						<input
							class="bg-transparent border border-gray-400 rounded-md h-fit w-full"
							type="text"
							id="major"
							bind:value={formValues.major}
						/>
					</div>
					{#if formValues.isUIUCStudent == 'no'}
						<div class="flex flex-col items-start">
							<label for="college-name">Name of University</label>
							<input
								class="bg-transparent border border-gray-400 rounded-md h-fit w-full"
								type="text"
								id="college-name"
								bind:value={formValues.collegeName}
								required
							/>
						</div>
					{/if}
					<div class="flex flex-col items-start gap-2">
						<label for="is-first-gen">If you're a college student, are you first generation?</label>
						<FirstGenSelector bind:firstGen={formValues.firstGen} />
					</div>
				</div>
				<PageControls {formValues} bind:page {pageMeta} />
			</GlassContainer>
		{/if}

		<!-- DEMOGRAPHICS -->
		{#if page == 4}
			<GlassContainer>
				<div class="flex flex-col gap-5 mb-3">
					<div class="text-xl text-white">{pageMeta[page].title}</div>
					<div class="flex flex-col items-start  gap-2">
						<label for="gender" class="flex flex-row gap-2">
							<div>Age</div>
							<div class="text-slate-400">(optional)</div>
						</label>
						<input
							class="bg-transparent border border-gray-400 rounded-md h-fit w-16"
							type="number"
							id="age"
							bind:value={formValues.age}
						/>
					</div>
					<div id="genderDemographics" class="flex flex-col items-start gap-2">
						<label for="gender" class="flex flex-row gap-2">
							<div>Gender</div>
							<div class="text-slate-400">(optional)</div>
						</label>
						<GenderSelector bind:gender={formValues.gender} />
					</div>
					<div class="flex flex-col items-start gap-2">
						<label for="gender" class="flex flex-row gap-2">
							<div>Ethnicity</div>
							<div class="text-slate-400">(optional)</div>
						</label>
						<EthinicitySelector bind:ethnicity={formValues.ethnicity} />
					</div>
					<div class="flex flex-col items-start gap-2" id="raceDemographics">
						<label for="gender" class="flex flex-row gap-2">
							<div>Race</div>
							<div class="text-slate-400">(optional)</div>
						</label>
						<div class="flex flex-row flex-wrap">
							{#each raceOptions as { raceId, displayText }}
								<button
									id={raceId}
									on:click={() => {
										if (formValues.race.includes(raceId)) {
											formValues.race = formValues.race.filter((val) => val !== raceId);
										} else {
											formValues.race = formValues.race.concat(raceId);
										}
									}}
									class="w-1/2 duration-300 text-center bg-white p-3 {formValues.race.includes(
										raceId
									)
										? 'bg-opacity-40'
										: 'bg-opacity-10 hover:bg-opacity-20'}"
								>
									{displayText}</button
								>
							{/each}
						</div>
						<div class="flex flex-row gap-3 items-center pl-3">
							<label for="other">Other</label>
							<input
								class="bg-transparent border border-gray-400 rounded-md h-fit"
								type="text"
								id="other"
								bind:value={formValues.raceOther}
							/>
						</div>
					</div>
				</div>

				<PageControls {formValues} bind:page {pageMeta} />
			</GlassContainer>
		{/if}

		{#if page == 5}
			<GlassContainer>
				<div class="flex flex-col gap-5 mb-3">
					<div class="text-xl text-white">{pageMeta[page].title}</div>

					<DietaryOptions bind:foodOther={formValues.food} />
				</div>
				<PageControls {formValues} bind:page {pageMeta} />
			</GlassContainer>
		{/if}

		<!--Section 4: Resume/Networking -->
		{#if page == 6}
			<GlassContainer>
				<div class="flex flex-col gap-5 mb-3">
					<div class="text-xl text-white">{pageMeta[page].title}</div>
					<div class="flex flex-col items-start">
						<label for="resume">Upload your Resume Here</label>
						<input
							type="file"
							name="resume"
							accept="application/pdf, application/msword, .doc, .docx"
							class="bg-rp-dull-pink border border-gray-400 rounded-md h-fit"
						/>
					</div>

					<div>
						<label for="job-type">Job Type Interest: </label>
						<input
							class="bg-rp-dull-pink border border-gray-400 rounded-md h-fit"
							type="checkbox"
							id="full-time"
							value="full-time"
							bind:group={formValues.jobTypeInterest}
						/>
						<label for="full-time">Full Time</label>
						<input
							type="checkbox"
							id="internship"
							value="internship"
							bind:group={formValues.jobTypeInterest}
							class="bg-rp-dull-pink border border-gray-400 rounded-md h-fit"
						/>
						<label for="internship">Internship</label>
						<input
							class="bg-rp-dull-pink border border-gray-400 rounded-md h-fit"
							type="checkbox"
							id="co-op"
							value="co-op"
							bind:group={formValues.jobTypeInterest}
						/>
						<label for="co-op">Co-Op</label>
					</div>

					<div class="flex flex-col items-start">
						<label for="portfolio">Portfolio Link/LinkedIn</label>
						<input
							class="bg-rp-dull-pink border border-gray-400 rounded-md h-fit"
							type="url"
							bind:value={formValues.portfolioLink}
						/>
					</div>
				</div>
				<PageControls {formValues} bind:page {pageMeta} />
			</GlassContainer>
		{/if}

		{#if page == 7}
			<GlassContainer>
				<div class="flex flex-col gap-5 mb-3">
					<div class="text-xl text-white">{pageMeta[page].title}</div>
					<div class="flex flex-col gap-5 mb-3">
						<label for="mech-puzzle">Are you interested in MechMania/PuzzleBang? </label>
						{#each extraEventOptions as { extraEventId, displayText }}
							<div class="flex items-center">
								<input
									type="checkbox"
									id={extraEventId}
									value={extraEventId}
									bind:group={formValues.mechPuzzle}
									class="bg-rp-dull-pink border border-gray-400 rounded-md h-fit"
								/>
								<label for={extraEventId}>{displayText}</label>
							</div>
						{/each}
					</div>
				</div>

				<PageControls {formValues} bind:page {pageMeta} />
			</GlassContainer>
		{/if}

		{#if page == 8}
			<GlassContainer>
				{#if !submitted}
				<div class="flex flex-col gap-5 mb-3">
					<div class="text-xl text-white">{pageMeta[page].title}</div>

					<div>
						<label for="marketing" class="mb-2">How did you hear about R|P? </label>
						<div class="flex flex-row flex-wrap">
							{#each referralOptions as { referralId, displayText }}
								<span class="flex flex-row items-center w-1/2">
									<input
										class="rounded-md"
										type="checkbox"
										id={referralId}
										value={referralId}
										bind:group={formValues.marketing}
									/>
									<label for={referralId}>{displayText}</label>
								</span>
							{/each}
						</div>

						<label for="marketin-other">Other</label>
						<input
							class="bg-rp-dull-pink border border-gray-400 rounded-md h-fit"
							type="text"
							id="marketing-other"
							bind:value={formValues.marketingOther}
						/>
					</div>
				</div>
				{/if}
				{#if !submitted && formValues.marketing.length != 0 || formValues.marketingOther != ''}
					<button
						type="submit"
						class="mx-auto disabled:opacity-25 disabled:cursor-not-allowed duration-500 bg-white bg-opacity-30 text-white px-3 py-2 m-3 rounded-md flex gap-2 border border-white"
						on:click = {onSubmit}
					>
						Submit
					</button>
				{/if}

				{#if !submitted}
					<PageControls {formValues} bind:page {pageMeta} />
				{/if}

				{#if submitted}
					Thank you for your interest in Reflections | Projections 2023! Please check your email for additional information.
				{/if}
			</GlassContainer>
		{/if}
	</form>
</main>

<!--
	Page 0) Name, email, isCollegeStudent
	Page 1) if they said yes to CollegeStudent 
	Page 4) Demographics
	Page 5) Food
	Page 6) Resume
	Page 7) MechMania and PuzzleBang
	Page 8 ) How did you hear about RP?
-->
<style>
	input {
		padding: 0.25rem;
	}

	.counter {
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px;
    }

    .counter button {
      cursor: pointer;
      padding: 0 10px;
    }

</style>
