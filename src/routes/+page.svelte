<script lang="ts">
    import { API_URL } from '../constants';
    import { get } from 'svelte/store';
	import Footer from '../components/footer.svelte';
	import Sponsors from '../components/home/sponsors.svelte';
    import GlassContainer from '../components/glass-container.svelte';

    let qrImg = null;
    const url = get(API_URL);
    fetch(`${url}/attendee/qr`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Origin': 'dev.reflectionsprojections.org'
        }
    }).then(response =>
        response.text()
    ).then(text => {
        qrImg = text; 
    });
</script>

<div class="h-full text-white flex items-center">
	<span class="w-full">
		<h1 class="w-full text-center text-3xl sm:text-5xl lg:text-7xl mb-3 md:mb-6">
			reflections | projections
		</h1>
		<div class="text-center text-md sm:text-2xl lg:text-4xl uppercase mb-5 md:mb-10">
			September 18 - 22, 2023
		</div>
		<button class="bg-white text-center block mx-auto p-3 lg:p-4 rounded-lg">
			<span
				class="uppercase text-black text-sm sm:text-md md:text-lg lg:text-xl font-semibold text-rp-gradient"
				>Register</span
			>
		</button>
	</span>
</div>
<section>
    <h2 class="text-white text-3xl sm:text-5xl md:text-7xl text-center mb-10 sm:mb-20">Your QR Code</h2>
    <div class="block w-8/12 max-w-sm mx-auto">
        <GlassContainer>
            <img class="w-full aspect-square" src={qrImg} />
        </GlassContainer>
    </div>
</section>
<Sponsors />
<Footer />
