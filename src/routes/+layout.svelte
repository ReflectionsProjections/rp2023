<script>
	import '../app.css';
	import Navbar from '../components/navbar.svelte';
	/** @type {import('./$types').LayoutData} */
	export let data;
</script>

<div class="h-screen">
	<Navbar user={data.user} />
	<slot />
</div>
