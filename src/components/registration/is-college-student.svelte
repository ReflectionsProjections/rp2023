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
