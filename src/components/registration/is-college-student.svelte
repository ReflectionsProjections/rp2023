<script lang="ts">
	export let isCollegeStudent: string = '';
</script>

<div>
	<label for="is-college-student">Are you a college student? </label>
	<select id="is-college-student" bind:value={isCollegeStudent}>
		<option value="">Choose One</option>
		<option value="yes">Yes</option>
		<option value="no">No</option>
	</select>
</div>
