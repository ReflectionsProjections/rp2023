<script lang="ts">
	export let isCollegeStudent: string = '';
</script>

<div class="flex flex-row gap-2">
	<label for="is-college-student text-lg">Are you a college student? </label>
	<select
		class="bg-rp-dull-pink border rounded-md p-0.5"
		id="is-college-student"
		bind:value={isCollegeStudent}
	>
		<!-- <option value="">Choose One</option> -->
		<option value="yes">Yes</option>
		<option value="">No</option>
	</select>
</div>

<style>
	/* select {
		background-color: rgb(30 41 59);
		border-color: rgb(255 255 255);
		border-radius: 0.375rem;
		border-width: 2px;
		margin-left: 2px;
		margin-right: 2px;
		height: fit-content;
	} */
</style>
