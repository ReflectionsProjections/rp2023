<script lang="ts">
    import GlassContainer from '../../components/glass-container.svelte';

    let userEmail = '';
    let searchEmail = 'test2@illinois.edu';
    const onSubmit = async () => {
        const response = await fetch('http://localhost:3000/auth/me', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
        const data = await response.json();
        const userEmail = data.email; //get's user's email
        // console.log(userEmail); 
        console.log(response); 
	};
</script>

<div class="h-40 text-white flex items-center">
    <button class="mx-auto disabled:opacity-25 disabled:cursor-not-allowed duration-500 bg-white bg-opacity-30 text-white px-3 py-2 m-3 rounded-md flex gap-2 border border-white"
    on:click = {onSubmit}>Click</button>
    <p class="px-3 py-2 m-3"> Email: {userEmail}</p>
</div>

<div class="mx-auto my-auto w-[50%] h-[60%] md:w-3/5 lg:w-2/5 bg-black bg-opacity-10 rounded-lg p-7">
    QR code
</div>
