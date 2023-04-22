<script lang="ts">
	import IsCollegeStudent from '../../components/registration/is-college-student.svelte';
	import OtherField from '../../components/registration/other-field.svelte';
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
		foodOther: '',
		resumeSharePerms: '',
		jobTypeInterest: [],
		portfolioLink: '',
		gpa: '',
		mechPuzzle: '',
		marketing: [],
		marketingOther: ''
	};
</script>

<div>Welcome to Registration!</div>

<div class="h-screen">
	<!-- For Debugging Only: Can see the values of each field as you edit on site-->
	<main>
		<form>
			<div>
				<label for="name">Name: </label>
				<input type="text" id="name" bind:value={formValues.name} required />
			</div>
			<div>
				<label for="email">Email: </label>
				<input type="email" id="email" bind:value={formValues.email} required />
			</div>
			<IsCollegeStudent bind:isCollegeStudent={formValues.isCollegeStudent} />

			{#if formValues.isCollegeStudent == 'yes'}
				<div>
					<label for="is-uiuc-student">Are you a UIUC student? </label>
					<select id="is-uiuc-student" bind:value={formValues.isUIUCStudent}>
						<option value="">Choose One</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>

				<div>
					<label for="exp-grad-date">Expected Graduation Year: </label>
					<input type="date" id="exp-grad-date" bind:value={formValues.expectedGradYear} />
				</div>

				<div>
					<label for="major">Major (if applicable): </label>
					<input type="text" id="major" bind:value={formValues.major} />
				</div>
			{/if}

			{#if formValues.isUIUCStudent == 'no'}
				<div>
					<label for="college-name">Name of University: </label>
					<input type="text" id="college-name" bind:value={formValues.collegeName} />
				</div>
			{/if}

			{#if formValues.isCollegeStudent == 'no'}
				<div>
					<label for="occupation">Current Occupation: </label>
					<input type="text" id="occupation" bind:value={formValues.occupation} />
				</div>
			{/if}

			<!-- DEMOGRAPHICS -->
			{#if formValues.isCollegeStudent == 'yes' || formValues.occupation != ''}
				<div>
					<label for="age">Age: </label>
					<input type="number" id="age" bind:value={formValues.age} min="1" />
				</div>
				<script type="text/javascript">
					function showfield(name) {
						if (name == 'Other')
							document.getElementById('genderDemographics').innerHTML =
								'Other: <input type="text" name="other" />';
						else document.getElementById('genderDemographics').innerHTML = '';
					}
				</script>
				<div id="genderDemographics">
					<label for="gender">Gender: </label>
					<select id="gender" bind:value={formValues.gender}>
						<option value="">Choose One</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="preferNotToSay">Prefer not to say</option>
						<option value="Other">Other</option>
					</select>
				</div>
				<div>
					<label for="ethnicity">Ethnicity: </label>
					<select id="ethnicity" bind:value={formValues.ethnicity}>
						<option value="">Choose One</option>
						<option value="hispanicOrLatino">Hispanic/Latino</option>
						<option value="notHispanicOrLatino">Not Hispanic/Latino</option>
					</select>
				</div>
				<script type="text/javascript">
					function showfield(name) {
						if (name == 'Other')
							document.getElementById('raceDemographics').innerHTML =
								'Other: <input type="text" name="other" />';
						else document.getElementById('raceDemographics').innerHTML = '';
					}
				</script>
				<div id="raceDemographics">
					<label for="race">Race: </label> <br />
					<input
						type="checkbox"
						id="americanIndianOrAlaska"
						value="americanIndianOrAlaska"
						bind:group={formValues.race}
					/>
					<label for="americanIndianOrAlaska">American Indian/Alaska Native</label> <br />
					<input type="checkbox" id="eastAsian" value="eastAsian" bind:group={formValues.race} />
					<label for="eastAsian">East Asian</label> <br />
					<input type="checkbox" id="southAsian" value="southAsian" bind:group={formValues.race} />
					<label for="southAsian">South Asian</label> <br />
					<input type="checkbox" id="black" value="black" bind:group={formValues.race} />
					<label for="black">Black or African-American</label> <br />
					<input
						type="checkbox"
						id="pacificIslander"
						value="pacificIslander"
						bind:group={formValues.race}
					/>
					<label for="pacificIslander">PacificIslander</label> <br />
					<input type="checkbox" id="white" value="white" bind:group={formValues.race} />
					<label for="white">White/Caucasian</label> <br />
					<label for="other">Other</label>
					<input type="text" id="other" bind:value={formValues.raceOther} />
				</div>
				<div>
					<label for="is-first-gen">If you're a college student, are you first generation?</label>
					<select id="is-first-gen" bind:value={formValues.firstGen}>
						<option value="">Choose One</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
			{/if}

			{#if formValues.firstGen != ''}
				<div>
					<label for="food">Do you have any dietary restrictions? </label>
					<select id="food" bind:value={formValues.food}>
						<option value="Vegetarian">Vegetarian</option>
						<option value="Vegan">Vegan</option>
						<option value="Gluten-Free">Gluten-Free</option>
						<option value="none">No dietary restrictions</option>
						<input type="other" id="food-other" bind:value={formValues.foodOther} />
					</select>
				</div>
			{/if}

			<!--Section 4: Resume/Networking -->
			{#if formValues.food != ''}
				<div>
					<label for="perms-res-share"
						>Would you like your resume to be shared with R|P sponsors?
					</label>
					<select id="perms-res-share" bind:value={formValues.resumeSharePerms}>
						<option value="no">No</option>
						<option value="yes">Yes</option>
					</select>
				</div>

				{#if formValues.resumeSharePerms == 'yes'}
					<div>
						<label for="resume">Upload your Resume Here: </label>
						<input
							type="file"
							name="resume"
							accept="application/pdf, application/msword, .doc, .docx"
						/>
					</div>
				{/if}

				<div>
					<label for="job-type">Job Type Interest: </label> <br />
					<input
						type="checkbox"
						id="full-time"
						value="full-time"
						bind:group={formValues.jobTypeInterest}
					/>
					<label for="full-time">Full Time</label> <br />
					<input
						type="checkbox"
						id="internship"
						value="internship"
						bind:group={formValues.jobTypeInterest}
					/>
					<label for="internship">Internship</label> <br />
					<input type="checkbox" id="co-op" value="co-op" bind:group={formValues.jobTypeInterest} />
					<label for="co-op">Co-Op</label>

					<!-- <select id="job-type" bind:value={formValues.jobTypeInterest} multiple>
                    <option value="full-time">Full Time</option>
                    <option value="internship">Internship</option>
                    <option value="co-op">Co-Op</option>
                </select> -->
				</div>

				<div>
					<label for="portfolio">Portfolio Link/LinkedIn: </label>
					<input type="url" bind:value={formValues.portfolioLink} />
				</div>

				<div>
					<label for="gpa">GPA</label>
					<input type="number" min="1.0" max="5.0" bind:value={formValues.gpa} />
				</div>
			{/if}

			{#if formValues.resumeSharePerms != ''}
				<div>
					<label for="mech-puzzle">Are you interested in MechMania/PuzzleBang? </label>
					<select id="mech-puzzle" bind:value={formValues.mechPuzzle}>
						<option value="both">Yes, I'm interested in both</option>
						<option value="mechmania">I'm just interested in MechMania</option>
						<option value="puzzlebang">I'm just interested in PuzzleBang</option>
						<option value="no-Free">No</option>
					</select>
				</div>
			{/if}

			{#if formValues.mechPuzzle != ''}
				<div>
					<label for="marketing">How did you hear about R|P? </label> <br />
					<input type="checkbox" id="ACMOH" value="ACMOH" bind:group={formValues.marketing} />
					<label for="ACMOH">ACM Open House</label> <br />
					<input type="checkbox" id="ACMN" value="ACMN" bind:group={formValues.marketing} />
					<label for="ACMN">ACM Newsletter</label> <br />
					<input
						type="checkbox"
						id="building-ads"
						value="building-ads"
						bind:group={formValues.marketing}
					/>
					<label for="building-ads">Building Ads</label> <br />
					<input type="checkbox" id="courses" value="Course" bind:group={formValues.marketing} />
					<label for="courses">School Course</label> <br />
					<input type="checkbox" id="WCS" value="WCS" bind:group={formValues.marketing} />
					<label for="WCS">WCS Newsletter</label> <br />
					<input
						type="checkbox"
						id="cs-newsletter"
						value="cs-newsletter"
						bind:group={formValues.marketing}
					/>
					<label for="cs-newsletter">CS Department Newsletter</label> <br />
					<input
						type="checkbox"
						id="instagram"
						value="instagram"
						bind:group={formValues.marketing}
					/>
					<label for="instagram">Instagram</label> <br />
					<input type="checkbox" id="facebook" value="facebook" bind:group={formValues.marketing} />
					<label for="facebook">Facebook</label> <br />
					<input type="checkbox" id="twitter" value="twitter" bind:group={formValues.marketing} />
					<label for="twitter">Twitter</label> <br />
					<input type="checkbox" id="linkedin" value="linkedin" bind:group={formValues.marketing} />
					<label for="linkedin">LinkedIn</label> <br />
					<input type="checkbox" id="email" value="email" bind:group={formValues.marketing} />
					<label for="email">E-mail</label> <br />
					<input type="checkbox" id="posters" value="posters" bind:group={formValues.marketing} />
					<label for="posters">Posters/Flyers</label> <br />
					<input type="checkbox" id="quad-day" value="quad-day" bind:group={formValues.marketing} />
					<label for="quad-day">Quad Day</label> <br />
					<input type="checkbox" id="e-night" value="e-night" bind:group={formValues.marketing} />
					<label for="e-night">E-Night</label> <br />
					<input type="checkbox" id="website" value="website" bind:group={formValues.marketing} />
					<label for="website">Website</label> <br />
					<input type="checkbox" id="slack" value="slack" bind:group={formValues.marketing} />
					<label for="slack">Slack</label> <br />
					<input type="checkbox" id="discord" value="discord" bind:group={formValues.marketing} />
					<label for="discord">Discord</label> <br />
					<input
						type="checkbox"
						id="word-of-mouth"
						value="word-of-mouth"
						bind:group={formValues.marketing}
					/>
					<label for="word-of-mouth">Word of Mouth</label> <br />
					<label for="marketin-other">Other: </label>
					<input type="text" id="marketing-other" bind:value={formValues.marketingOther} />
				</div>
			{/if}

			{#if formValues.marketing.length != 0}
				<input type="submit" />
			{/if}
		</form>
		<div>
			<pre>
                {JSON.stringify(formValues, null, 2)}
            </pre>
		</div>
	</main>
</div>

<style>
	div {
		padding-top: 15px;
		padding-bottom: 15px;
	}
</style>
