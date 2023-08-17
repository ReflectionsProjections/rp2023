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

<div class="xl:h-full text-white flex items-center mx-10 xl:mx-20 my-48 xl:my-0">
	<span class="w-full flex-col xl:flex-row flex items-center">
        <div class="w-full xl:w-1/2 xl:pr-5">
            <img class="w-full md:w-9/12 mx-auto xl:w-11/12 mb-10" src="/rp-text-logo-white.svg" />
            <div class="text-center xl:text-left text-md sm:text-2xl lg:text-4xl uppercase xl:mb-5 mb-10">
                September 18 - 22, 2023
            </div>
        </div>
        <div class="w-full xl:w-1/2 xl:pl-5">
            <GlassContainer>
                <p class="w-full xl:text-right text-lg mb-5">Expand your horizons at the Midwest’s largest student run tech conference this September. Join us for a week full of insightful talks from industry & academia leaders, hands-on workshops, and networking events.</p>
                <button class="bg-white text-center block mx-auto xl:mr-0 p-3 lg:p-4 rounded-lg">
                    <span
                        class="uppercase text-black text-sm sm:text-md md:text-md lg:text-md font-semibold text-rp-gradient"
                        >Register Now</span
                    >
                </button>
            </GlassContainer>
        </div>
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
