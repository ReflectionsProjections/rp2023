<script lang="ts">
	import GlassContainer from '../../components/glass-container.svelte';
	import IsaCollegeStudent from '../../components/registration/is-college-student.svelte';
	import PageControls from '../../components/registration/page-controls.svelte';
	
	import DataTable, {
		Head,
		Body,
		Row,
		Cell,
		Pagination,
	} from '@smui/data-table';
	import IconButton from '@smui/icon-button';
	import { Label } from '@smui/common';
	import Select, { Option } from '@smui/select';
 
	let majors = ['None', 'Computer Science', 'Computer Science + X', 'Computer Engineering', 'Electrical Engineering', 'Other'];
	let major_value = 'None';

	let grad_year = ['None', 'December 2023', 'May 2024', 'December 2024', 'May 2025', 'December 2025', 'May 2026', 'December 2026', 'May 2026', 'December 2027', 'May 2027 or later'];
	let grad_year_value = 'None';

	type Todo = {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
	};
	let items: Todo[] = [];
	let rowsPerPage = 10;
	let currentPage = 0;

	$: start = currentPage * rowsPerPage;
	$: end = Math.min(start + rowsPerPage, items.length);
	$: slice = items.slice(start, end);
	$: lastPage = Math.max(Math.ceil(items.length / rowsPerPage) - 1, 0);

	$: if (currentPage > lastPage) {
		currentPage = lastPage;
	}

	if (typeof fetch !== 'undefined') {
		// Slice a few off the end to show how the
		// last page looks when it's not full.
		fetch(
		'https://gist.githubusercontent.com/hperrin/e24a4ebd9afdf2a8c283338ae5160a62/raw/dcbf8e6382db49b0dcab70b22f56b1cc444f26d4/todos.json'
		)
		.then((response) => response.json())
		.then((json) => (items = json.slice(0, 197)));
	}
</script>

<main class="flex flex-col h-full">
			
			<div class="mx-auto my-auto w-fit text-gray-100 accent-rp-pink">
				<GlassContainer>
					<h1 class="text-5xl" > Resume Viewer </h1>
				</GlassContainer>
			</div>
			
			<div class="mx-auto my-auto w-fit text-gray-100 accent-rp-pink">
				<GlassContainer>	
					<div class="columns margins" style="justify-content: flex-start;">
						<Select bind:major_value label="Filter by Major:">
							{#each majors as major}
								<Option major_value={major}>{major}</Option>
							{/each}
						</Select>
						<pre class="status">Selected: {major_value}</pre>
					</div>
				</GlassContainer>
			</div>
			<div>
				<GlassContainer>
					<DataTable stickyHeader table$aria-label="Resume Table" style="width: 100%;">
						<Head>
						  <Row>
							<Cell numeric>ID</Cell>
							<Cell style="width: 100%;">Title</Cell>
							<Cell>Completed</Cell>
							<Cell numeric>User ID</Cell>
						  </Row>
						</Head>
						<Body>
						  {#each slice as item (item.id)}
							<Row>
							  <Cell numeric>{item.id}</Cell>
							  <Cell>{item.title}</Cell>
							  <Cell>{item.completed ? 'Yes' : 'No'}</Cell>
							  <Cell numeric>{item.userId}</Cell>
							</Row>
						  {/each}
						</Body>
					  
						<Pagination slot="paginate">
						  <svelte:fragment slot="rowsPerPage">
							<Label>Rows Per Page</Label>
							<Select variant="outlined" bind:value={rowsPerPage} noLabel>
							  <Option value={10}>10</Option>
							  <Option value={25}>25</Option>
							  <Option value={100}>100</Option>
							</Select>
						  </svelte:fragment>
						  <svelte:fragment slot="total">
							{start + 1}-{end} of {items.length}
						  </svelte:fragment>
					  
						  <IconButton
							class="material-icons"
							action="first-page"
							title="First page"
							on:click={() => (currentPage = 0)}
							disabled={currentPage === 0}>first_page</IconButton
						  >
						  <IconButton
							class="material-icons"
							action="prev-page"
							title="Prev page"
							on:click={() => currentPage--}
							disabled={currentPage === 0}>chevron_left</IconButton
						  >
						  <IconButton
							class="material-icons"
							action="next-page"
							title="Next page"
							on:click={() => currentPage++}
							disabled={currentPage === lastPage}>chevron_right</IconButton
						  >
						  <IconButton
							class="material-icons"
							action="last-page"
							title="Last page"
							on:click={() => (currentPage = lastPage)}
							disabled={currentPage === lastPage}>last_page</IconButton
						  >
						</Pagination>
					  </DataTable>
				</GlassContainer>
			</div>

			<div>
				table
			</div>

</main>


<style>
	input {
		padding: 0.25rem;
	}
</style>
