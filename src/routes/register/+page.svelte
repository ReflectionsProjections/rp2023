<script lang="ts">
	import GlassContainer from '../../components/glass-container.svelte';
	import Marketing from '../../components/registration/marketing.svelte'
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
		jobTypeOptions,

	} from '../../components/registration/misc-types';
	import PageControls from '../../components/registration/page-controls.svelte';
	import type { PageIndex, PageMeta } from '../../components/registration/page-meta.type';
	import RaceSelector from '../../components/registration/race-selector.svelte';
	import HandleClick from '../../components/registration/submit-handler.svelte';

	let formValues = {
		name: '',
		email: '',
		isCollegeStudent: 'yes' as boolStr,
		isUIUCStudent: 'yes' as boolStr,
		major: '',
		majorOther: '',
		collegeName: '',
		expectedGradTerm: '',
		expectedGradYear: '',
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

	let page: PageIndex = 'welcome';

	const referralOptions = [
		{ referralId: 'ACMOH', displayText: 'ACM Open House' },
		{ referralId: 'buildingAds', displayText: 'Building Ads' },
		{ referralId: 'courses', displayText: 'School Course' },
		{ referralId: 'instagram', displayText: 'Instagram' },
		{ referralId: 'email', displayText: 'E-mail' },
		{ referralId: 'posters', displayText: 'Posters/Flyers' },
		{ referralId: 'website', displayText: 'Website' },
		{ referralId: 'word-of-mouth', displayText: 'Word of Mouth' }
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

	let fileData: File;

	$: console.log(fileData);

	let attendeeId: string;

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
		const responseData = await response.json();
		attendeeId = responseData._id.toString();
		return attendeeId;
	};

	function handleFileInput(event: Event) {

		var fileInput = document.getElementById('resume-upload') as HTMLInputElement | null;
		var file = fileInput?.files?.[0];

		if (file) {
			fileData = file;
			console.log("Filedata is updated to: ", fileData);
		}
	};

</script>

<main class="flex h-full">
	<form class="mx-auto my-auto w-[90%] md:w-3/5 lg:w-2/5 text-gray-200 accent-rp-pink">
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
					<div class="flex flex-row items-start">
						<label for="exp-grad-date">Expected Graduation Date: </label>
						<select name="exp-grad-term" id="grad-term" bind:value={formValues.expectedGradTerm} class="bg-transparent border border-gray-400 rounded-md h-fit">
							{#each gradTermOptions as { gradTermId, displayText }}
								<option
									class="w-1/2 text-black p-3"
									value={gradTermId}>{displayText}
								</option>
							{/each}
						</select>

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

					<!-- <div class="flex flex-col items-start">
						<label for="major">Major</label>
						<input
							class="bg-transparent border border-gray-400 rounded-md h-fit w-full"
							type="text"
							id="major"
							bind:value={formValues.major}
						/>
					</div> -->

					<MajorSelector bind:formMajor={formValues.major} bind:formMajorOpenEnded={formValues.majorOther}/>
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
							id="resume-upload"
							accept="application/pdf, application/msword, .doc, .docx"
							class="bg-rp-dull-pink border border-gray-400 rounded-md h-fit"
							on:change={handleFileInput}
						/>
					</div>

					<JobTypeOptions bind:formJobType={formValues.jobTypeInterest} />

					<div class="flex flex-col items-start">
						<label for="portfolio">Portfolio Link/LinkedIn (If you have multiple links, separate each link with a comma)</label>
						<input
							class="bg-rp-dull-pink border border-gray-400 rounded-md h-fit w-full"
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
					<div class="text-base text-slate-300">
						PLACEHOLDER FOR DESCRIPTION
					</div>
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
				{#if !submitted && formValues.marketing.length != 0 || formValues.marketingOther != ''}

					<HandleClick {onSubmit} {fileData}/>
					
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
