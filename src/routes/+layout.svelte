<script>
    import { userStore } from '../stores/user-store';
	import '../app.css';
	import Navbar from '../components/navbar.svelte';
	/** @type {import('./$types').LayoutData} */
	export let data;

    userStore.set(data.user);
</script>

<div class="h-screen">
	<Navbar />
	<slot />
</div>
