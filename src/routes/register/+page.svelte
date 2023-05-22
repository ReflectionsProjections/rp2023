<script lang="ts">
	import GlassContainer from '../../components/glass-container.svelte';
	import IsCollegeStudent from '../../components/registration/is-college-student.svelte';
	import PageControls from '../../components/registration/page-controls.svelte';

	const formValues = {
		name: '',
		email: '',
		isCollegeStudent: '',
		isUIUCStudent: '',
		major: '',
		collegeName: '',
		expectedGradYear: '',
		occupation: '',
		age: '',
		gender: '',
		ethnicity: '',
		race: [],
		raceOther: '',
		firstGen: '',
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

	const raceOptions = [
		{ raceId: 'americanIndianOrAlaska', displayText: 'American Indian/Alaska Native' },
		{ raceId: 'eastAsian', displayText: 'East Asian' },
		{ raceId: 'southAsian', displayText: 'South Asian' },
		{ raceId: 'black', displayText: 'Black or African-American' },
		{ raceId: 'pacificIslander', displayText: 'Pacific Islander' },
		{ raceId: 'white', displayText: 'White/Caucasian' }
	];

	const extraEventOptions = [
		{ extraEventId: 'mechmania', displayText: 'MechMania' },
		{ extraEventId: 'puzzlebang', displayText: 'PuzzleBang' }
	];

	const onSubmit = async () => {
		const response = await fetch('http://localhost:3000/attendee', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formValues)
		});
		console.log(response); //For debugging. After clicking submit, should be able to see the request in console
	};
	
</script>

<main class="flex h-full">
	<form class="mx-auto my-auto w-fit text-gray-100 accent-rp-pink">
		{#if page == 0}
			<GlassContainer>
				<div class="flex flex-col gap-5 mb-3">
					<div class="flex flex-row items-center">
						<label class="text-lg" for="name">Name</label>
						<input
							id="name"
							bind:value={formValues.name}
							required
							class="bg-transparent border-2 border-gray-400 rounded-md mx-2 h-fit"
						/>
					</div>
					<div class="flex flex-row items-center">
						<label class="text-lg" for="email">Email</label>
						<input
							type="email"
							id="email"
							bind:value={formValues.email}
							class="bg-transparent border-2 border-gray-400 rounded-md mx-2 h-fit"
							required
						/>
					</div>
					<IsCollegeStudent bind:isCollegeStudent={formValues.isCollegeStudent} />
				</div>
				<PageControls bind:page prev={-1} next={formValues.isCollegeStudent ? 1 : 3} />
			</GlassContainer>
		{/if}

		{#if page == 1}
			<GlassContainer>
				<div class="flex flex-col gap-5 mb-3">
					<div class="flex flex-row justify-between items-center">
						<label class="text-lg" for="is-uiuc-student">Are you a UIUC student? </label>
						<select
							class="bg-rp-dull-pink border rounded-md p-0.5"
							id="is-uiuc-student"
							bind:value={formValues.isUIUCStudent}
							required
						>
							<option value="">Choose One</option>
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</select>
					</div>

					<div class="flex flex-row justify-between items-center">
						<label class="text-lg" for="exp-grad-date">Expected Graduation Year: </label>
						<input
							class="bg-rp-dull-pink border-2 border-gray-400 rounded-md mx-2 h-fit"
							type="date"
							id="exp-grad-date"
							required
							bind:value={formValues.expectedGradYear}
						/>
					</div>

					<div class="flex flex-row items-center">
						<label class="text-lg" for="major">Major (if applicable): </label>
						<input
							class="bg-rp-dull-pink border-2 border-gray-400 rounded-md mx-2 h-fit"
							type="text"
							id="major"
							bind:value={formValues.major}
						/>
					</div>
					{#if formValues.isUIUCStudent == 'no'}
						<div class="flex flex-row items-center">
							<label class="text-lg" for="college-name">Name of University: </label>
							<input
								class="bg-rp-dull-pink border-2 border-gray-400 rounded-md mx-2 h-fit"
								type="text"
								id="college-name"
								bind:value={formValues.collegeName}
								required
							/>
						</div>
					{/if}
				</div>
				<PageControls bind:page prev={0} next={4} />
			</GlassContainer>
		{/if}

		{#if page == 3}
			<GlassContainer>
				<div class="flex flex-row items-center mb-3">
					<label class="text-lg" for="occupation">Current Occupation </label>
					<input
						class="bg-rp-dull-pink border-2 border-gray-400 rounded-md mx-2 h-fit"
						type="text"
						id="occupation"
						bind:value={formValues.occupation}
						required
					/>
				</div>
				<PageControls bind:page prev={0} next={4} />
			</GlassContainer>
		{/if}

		<!-- DEMOGRAPHICS -->
		{#if page == 4}
			<GlassContainer>
				<div class="flex flex-col gap-5 mb-3">
					<div class="flex flex-row items-center  gap-2">
						<label class="text-lg" for="age">Age</label>
						<input
							class="bg-rp-dull-pink border-gray-400 rounded-md mx-2 h-fit w-16"
							type="number"
							id="age"
							bind:value={formValues.age}
						/>
					</div>
					<div id="genderDemographics" class="flex flex-row items-center gap-2">
						<label class="text-lg" for="gender">Gender</label>
						<select
							class="bg-rp-dull-pink border rounded-md p-0.5"
							id="gender"
							bind:value={formValues.gender}
						>
							<option value="">Choose One</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="nonbinary">Non-Binary</option>
							<option value="preferNotToSay">Prefer not to say</option>
						</select>
					</div>
					<div class="flex flex-row items-center gap-2">
						<label class="text-lg" for="ethnicity">Ethnicity: </label>
						<select
							class="bg-rp-dull-pink border rounded-md p-0.5"
							id="ethnicity"
							bind:value={formValues.ethnicity}
						>
							<option value="">Choose One</option>
							<option value="hispanicOrLatino">Hispanic/Latino</option>
							<option value="notHispanicOrLatino">Not Hispanic/Latino</option>
						</select>
					</div>
					<div id="raceDemographics">
						<label class="text-lg" for="race">Race: </label> <br />
						{#each raceOptions as { raceId, displayText }}
							<input
								type="checkbox"
								id={raceId}
								value={raceId}
								bind:group={formValues.race}
								class="bg-rp-dull-pink border-2 border-gray-400 rounded-md mx-2 h-fit"
							/>
							<label class="text-lg" for={raceId}>{displayText}</label> <br />
						{/each}
						<label class="text-lg" for="other">Other</label>
						<input
							class="bg-rp-dull-pink border-2 border-gray-400 rounded-md mx-2 h-fit"
							type="text"
							id="other"
							bind:value={formValues.raceOther}
						/>
					</div>
					<div class="flex flex-row items-center gap-2">
						<label class="text-lg" for="is-first-gen"
							>If you're a college student, are you first generation?</label
						>
						<select
							class="bg-rp-dull-pink border rounded-md p-0.5"
							id="is-first-gen"
							bind:value={formValues.firstGen}
						>
							<option value="">Choose One</option>
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</select>
					</div>
				</div>

				<PageControls bind:page prev={formValues.isCollegeStudent ? 1 : 3} next={5} />
			</GlassContainer>
		{/if}

		{#if page == 5}
			<GlassContainer>
				<div class="flex flex-col gap-5 mb-3">
					<label class="text-lg" for="food">Do you have any dietary restrictions? </label>
					<select
						class="bg-rp-dull-pink border rounded-md p-0.5"
						id="food"
						bind:value={formValues.food}
						required
					>
						<option value="Vegetarian">Vegetarian</option>
						<option value="Vegan">Vegan</option>
						<option value="Gluten-Free">Gluten-Free</option>
						<option value="none">No dietary restrictions</option>
						<!-- <input
							class="bg-rp-dull-pink border-2 border-gray-400 rounded-md mx-2 h-fit"
							type="other"
							id="food-other"
							bind:value={formValues.foodOther}
						/> -->
					</select>
				</div>
				<PageControls bind:page prev={4} next={6} />
			</GlassContainer>
		{/if}

		<!--Section 4: Resume/Networking -->
		{#if page == 6}
			<GlassContainer>
				<div class="flex flex-col gap-5 mb-3">
					<div class="flex flex-row items-center">
						<label class="text-lg" for="resume">Upload your Resume Here: </label>
						<input
							type="file"
							name="resume"
							accept="application/pdf, application/msword, .doc, .docx"
							class="bg-rp-dull-pink border-2 border-gray-400 rounded-md mx-2 h-fit"
						/>
					</div>

					<div>
						<label class="text-lg" for="job-type">Job Type Interest: </label>
						<input
							class="bg-rp-dull-pink border-2 border-gray-400 rounded-md mx-2 h-fit"
							type="checkbox"
							id="full-time"
							value="full-time"
							bind:group={formValues.jobTypeInterest}
						/>
						<label class="text-lg" for="full-time">Full Time</label>
						<input
							type="checkbox"
							id="internship"
							value="internship"
							bind:group={formValues.jobTypeInterest}
							class="bg-rp-dull-pink border-2 border-gray-400 rounded-md mx-2 h-fit"
						/>
						<label class="text-lg" for="internship">Internship</label>
						<input
							class="bg-rp-dull-pink border-2 border-gray-400 rounded-md mx-2 h-fit"
							type="checkbox"
							id="co-op"
							value="co-op"
							bind:group={formValues.jobTypeInterest}
						/>
						<label class="text-lg" for="co-op">Co-Op</label>
					</div>

					<div class="flex flex-row items-center">
						<label class="text-lg" for="portfolio">Portfolio Link/LinkedIn: </label>
						<input
							class="bg-rp-dull-pink border-2 border-gray-400 rounded-md mx-2 h-fit"
							type="url"
							bind:value={formValues.portfolioLink}
						/>
					</div>
				</div>
				<PageControls bind:page prev={5} next={7} />
			</GlassContainer>
		{/if}

		{#if page == 7}
			<GlassContainer>
				<div class="flex flex-col gap-5 mb-3">
					<div class="flex flex-col gap-5 mb-3">
						<label class="text-lg" for="mech-puzzle"
							>Are you interested in MechMania/PuzzleBang?
						</label>
						{#each extraEventOptions as { extraEventId, displayText }}
							<div class="flex items-center">
								<input
									type="checkbox"
									id={extraEventId}
									value={extraEventId}
									bind:group={formValues.mechPuzzle}
									class="bg-rp-dull-pink border-2 border-gray-400 rounded-md mx-2 h-fit"
								/>
								<label class="text-lg" for={extraEventId}>{displayText}</label>
							</div>
						{/each}
					</div>
				</div>

				<PageControls bind:page prev={6} next={8} />
			</GlassContainer>
		{/if}

		{#if page == 8}
			<GlassContainer>
				<div class="flex flex-col mb-3">
					<label class="text-lg" for="marketing">How did you hear about R|P? </label> <br />

					{#each referralOptions as { referralId, displayText }}
						<span class="flex flex-row items-center">
							<input
								class="bg-rp-dull-pink border-2 border-gray-400 rounded-md mx-2 h-fit"
								type="checkbox"
								id={referralId}
								value={referralId}
								bind:group={formValues.marketing}
							/>
							<label class="text-lg" for={referralId}>{displayText}</label> <br />
						</span>
					{/each}

					<label class="text-lg" for="marketin-other">Other: </label>
					<input
						class="bg-rp-dull-pink border-2 border-gray-400 rounded-md mx-2 h-fit"
						type="text"
						id="marketing-other"
						bind:value={formValues.marketingOther}
					/>
				</div>
				{#if formValues.marketing.length != 0 || formValues.marketingOther != ''}
					<button
						type="submit"
						class="mx-auto text-white px-3 py-2 m-3 rounded-md flex gap-2 border border-white"
						on:click = {onSubmit}
					>
						Submit
					</button>
				{/if}
				<PageControls bind:page prev={7} next={-1} />
			</GlassContainer>
		{/if}
	</form>
	<!-- <div>
			<pre>
                {JSON.stringify(formValues, null, 2)}
            </pre>
		</div> -->
</main>

<!--
	Page 0) Name, email, isCollegeStudent
	Page 1) if they said yes to CollegeStudent 

	Page 3) Occupation (if they said no to college student)
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
</style>
