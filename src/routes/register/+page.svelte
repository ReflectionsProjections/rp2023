<script lang="ts">
	import GlassContainer from '../../components/glass-container.svelte';
	import DietaryOptions from '../../components/registration/dietary-options.svelte';
	import DynamicEmail from '../../components/registration/dynamic-email.svelte';
	import EthinicitySelector from '../../components/registration/ethinicity-selector.svelte';
	import FirstGenSelector from '../../components/registration/first-gen-selector.svelte';
	import GenderSelector from '../../components/registration/gender-selector.svelte';
	import IsCollegeStudent from '../../components/registration/is-college-student.svelte';
	import JobTypeOptions from '../../components/registration/job-type-options.svelte';
	import ExtraEventOptions from '../../components/registration/extra-event-options.svelte';
	import MajorSelector from '../../components/registration/major-selector.svelte';
	import type {
		boolStr,
		ethnicityOptions,
		firstGenOptions,
		genderOptions,
		raceOptions,
		extraEventOptions,
		jobTypeOptions
	} from '../../components/registration/misc-types';
	import PageControls from '../../components/registration/page-controls.svelte';
	import type { PageIndex, PageMeta } from '../../components/registration/page-meta.type';
	import RaceSelector from '../../components/registration/race-selector.svelte';
	import Icon from '@iconify/svelte';
	import GradDateSelector from '../../components/registration/grad-date-selector.svelte';

	const formValues = {
		name: '',
		email: '',
		isCollegeStudent: 'yes' as boolStr,
		isUIUCStudent: 'yes' as boolStr,
		major: '',
		majorOther: '',
		collegeName: '',
		expectedGradTerm: '',
		gradYear: 2023,
		age: '',
		gender: 'preferNotToSay' as genderOptions,
		ethnicity: 'preferNotToSay' as ethnicityOptions,
		race: [] as raceOptions[],
		raceOther: '',
		firstGen: 'preferNotToSay' as firstGenOptions,
		food: '',
		jobTypeInterest: [] as jobTypeOptions[],
		portfolioLink: '',
		mechPuzzle: [] as extraEventOptions[],
		marketing: [],
		marketingOther: ''
	};
	let page: PageIndex = 'recruitment';

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

	const pageMeta: PageMeta = {
		welcome: {
			title: 'Welcome to R | P',
			next: (isCollegeStudent) => (isCollegeStudent ? 'academics' : 'demographics'),
			prev: () => 'none',
			requiredFields: ['name', 'email']
		},
		academics: {
			title: 'Academics',
			next: () => 'demographics',
			prev: () => 'welcome',
			requiredFields: ['expectedGradTerm', 'expectedGradYear', 'major', 'firstGen']
		},
		demographics: {
			title: 'Demographics',
			next: () => 'dietaryRestrictions',
			prev: (isCollegeStudent) => (isCollegeStudent ? 'academics' : 'welcome'),
			requiredFields: []
		},
		dietaryRestrictions: {
			title: 'Dietary Restrictions',
			next: () => 'recruitment',
			prev: () => 'demographics',
			requiredFields: ['food']
		},
		recruitment: {
			title: 'Recruitment',
			next: () => 'specialEvents',
			prev: () => 'dietaryRestrictions',
			requiredFields: []
		},
		specialEvents: {
			title: 'Special Events',
			next: () => 'marketing',
			prev: () => 'recruitment',
			requiredFields: []
		},
		marketing: {
			title: 'One Last Step',
			next: () => 'none',
			prev: () => 'specialEvents',
			requiredFields: ['marketing']
		}
	};

	$: console.log(formValues);

	let submitted = false;

	let error = '';

	const onSubmit = async () => {
		const response = await fetch('http://localhost:3000/attendee', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...formValues, expectedGradYear: formValues.gradYear.toString() })
		});

		submitted = true;
		console.log(response); //For debugging. After clicking submit, should be able to see the request in console
	};
</script>

<form
	class="fixed mx-auto center-div w-[90%] md:w-3/5 lg:w-2/5 text-gray-200 accent-rp-pink overflow-y-auto mt-8"
>
	{#if page == 'welcome'}
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

	{#if page == 'academics'}
		<GlassContainer>
			<div class="flex flex-col gap-5 mb-3">
				<div class="text-xl text-white">{pageMeta[page].title}</div>

				<GradDateSelector
					bind:gradYear={formValues.gradYear}
					bind:expectedGradTerm={formValues.expectedGradTerm}
				/>
				<MajorSelector bind:formMajor={formValues.major} bind:majorOther={formValues.majorOther} />
				{#if formValues.isUIUCStudent == 'no'}
					<div class="flex flex-col">
						<label for="college-name" class="ml-1">Name of University</label>
						<input
							class="bg-transparent border border-gray-400 rounded-md h-fit w-full"
							type="text"
							id="college-name"
							bind:value={formValues.collegeName}
							required
						/>
					</div>
				{/if}

				<FirstGenSelector bind:firstGen={formValues.firstGen} />
			</div>
			<PageControls {formValues} bind:page {pageMeta} />
		</GlassContainer>
	{/if}

	{#if page == 'demographics'}
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

				<GenderSelector bind:gender={formValues.gender} />

				<EthinicitySelector bind:ethnicity={formValues.ethnicity} />

				<RaceSelector bind:formRace={formValues.race} bind:formRaceOther={formValues.raceOther} />
			</div>

			<PageControls {formValues} bind:page {pageMeta} />
		</GlassContainer>
	{/if}

	{#if page == 'dietaryRestrictions'}
		<GlassContainer>
			<div class="flex flex-col gap-5 mb-3">
				<div class="text-xl text-white">{pageMeta[page].title}</div>

				<DietaryOptions bind:foodOther={formValues.food} />
			</div>
			<PageControls {formValues} bind:page {pageMeta} />
		</GlassContainer>
	{/if}

	{#if page == 'recruitment'}
		<GlassContainer>
			<div class="flex flex-col gap-5 mb-3">
				<div class="text-xl text-white">{pageMeta[page].title}</div>
				<div class="flex flex-col items-start">
					<label for="resume">Upload your Resume Here</label>
					<input
						type="file"
						name="resume"
						accept="application/pdf, application/msword, .doc, .docx"
						class="block w-full 
						text-gray-200 file:text-white
						file:mr-4 file:py-2 file:px-4
						file:rounded-full file:border-0
						file:bg-white file:bg-opacity-10
						file:hover:bg-opacity-20 hover:file:bg-violet-100
						file:duration-300"
					/>
				</div>

				<JobTypeOptions bind:formJobType={formValues.jobTypeInterest} />

				<div class="flex flex-col items-start">
					<label for="portfolio"
						>Portfolio Link/LinkedIn (Separate multiple links with commas)</label
					>
					<input
						class="bg-transparent border border-gray-400 rounded-md h-fit w-full"
						type="url"
						bind:value={formValues.portfolioLink}
					/>
				</div>
			</div>
			<PageControls {formValues} bind:page {pageMeta} />
		</GlassContainer>
	{/if}

	{#if page == 'specialEvents'}
		<GlassContainer>
			<div class="flex flex-col gap-5 mb-3">
				<div class="text-xl text-white">{pageMeta[page].title}</div>
				<div class="text-base text-slate-300">PLACEHOLDER FOR DESCRIPTION</div>
				<ExtraEventOptions bind:formExtraEvents={formValues.mechPuzzle} />
			</div>

			<PageControls {formValues} bind:page {pageMeta} />
		</GlassContainer>
	{/if}

	{#if page == 'marketing'}
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
			{#if (!submitted && formValues.marketing.length != 0) || formValues.marketingOther != ''}
				<button
					type="submit"
					class="mx-auto disabled:opacity-25 disabled:cursor-not-allowed duration-500 bg-white bg-opacity-30 text-white px-3 py-2 m-3 rounded-md flex gap-2 border border-white"
					on:click={onSubmit}
				>
					Submit
				</button>
			{/if}

			{#if !submitted}
				<PageControls {formValues} bind:page {pageMeta} />
			{/if}

			{#if submitted}
				Thank you for your interest in Reflections | Projections 2023! Please check your email for
				additional information.
			{/if}
		</GlassContainer>
	{/if}
</form>

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

	.center-div {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
