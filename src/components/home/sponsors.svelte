<script lang="ts">
	const petaSponsors = [
		{
			id: 'caterpillar',
			name: 'Caterpillar',
			imgUrl: 'logos/caterpillar.png',
			link: 'https://caterpillar.com'
		}
	];
	const gigaSponsors = [
		{
			id: 'aechelon',
			name: 'Aechelon Technology',
			imgUrl: 'logos/aechelon.png',
			link: 'https://aechelon.com'
		},
		{
			id: 'deere',
			name: 'John Deere',
			imgUrl: 'logos/deere.png',
			link: 'https://deere.com'
		},
		{
			id: 'state-farm',
			name: 'State Farm',
			imgUrl: 'logos/state-farm.png',
			link: 'https://statefarm.com'
		}
	];
	const sponsors = [
		{
			id: 'forcepoint',
			name: 'Forcepoint',
			imgUrl: 'logos/forcepoint.png',
			link: 'https://forcepoint.com'
		},
		{
			id: 'cloudflare',
			name: 'Cloudflare',
			imgUrl: 'logos/cloudflare.png',
			link: 'https://cloudflare.com'
		},
		{
			id: 'cmegroup',
			name: 'CME Group',
			imgUrl: 'logos/cmegroup.png',
			link: 'https://www.cmegroup.com/'
		},
		{
			id: 'hrt',
			name: 'Hudson River Trading',
			imgUrl: 'logos/hrt.png',
			link: 'https://www.hudsonrivertrading.com/'
		},
		{
			id: 'magna',
			name: 'Magna',
			imgUrl: 'logos/magna.png',
			link: 'https://magna.com'
		},
		{
			id: 'verkada',
			name: 'Verkada',
			imgUrl: 'logos/verkada.png',
			link: 'https://verkada.com'
		},
		{
			id: 'sandia',
			name: 'Sandia National Laboratories',
			imgUrl: 'logos/sandia.png',
			link: 'https://www.sandia.gov/'
		}
	];
</script>

<div class="w-[90%] md:w-4/5 lg:w-2/3 mx-auto py-14 lg:py-24">
	<h2 class="text-white text-xl md:text-2xl lg:text-4xl text-center mb-10 md:mb-14">
		Thank you to our sponsors:
	</h2>
	<div
		class="flex flex-col gap-3 mx-auto bg-pink-300 bg-opacity-80 backdrop-blur-sm rounded-3xl md:py-16 py-10"
	>
		<div class="flex flex-wrap justify-center gap-5 items-stretch">
			{#each petaSponsors as sponsor}
				<a
					href={sponsor.link}
					class="w-[80%] md:w-[66%] lg:w-[50%] xl:w-[40%] rounded-md duration-100 p-5 my-auto"
					referrerpolicy="no-referrer"
					target="_blank"
				>
					<img src={sponsor.imgUrl} alt="{sponsor.name} Logo" class="mx-auto" />
				</a>
			{/each}
		</div>
		<div class="mx-auto flex flex-wrap justify-center gap-5">
			{#each gigaSponsors as sponsor}
				<a
					href={sponsor.link}
					class="w-[50%] md:w-[50%] lg:w-[35%] xl:w-[30%] rounded-md duration-100 p-4 my-auto max-w-sm"
					referrerpolicy="no-referrer"
					target="_blank"
				>
					<img src={sponsor.imgUrl} alt="{sponsor.name} Logo" class="mx-auto" />
				</a>
			{/each}
		</div>
		<div class="w-[90%] max-w-4xl mx-auto flex flex-wrap justify-center gap-5 items-stretch">
			{#each sponsors as sponsor}
				<a
					href={sponsor.link}
					referrerpolicy="no-referrer"
					target="_blank"
					class="w-[65%] md:w-[50%] lg:w-[35%] xl:w-[25%] rounded-md duration-100 p-4 my-auto max-w-[200px]"
				>
					<img src={sponsor.imgUrl} alt="{sponsor.name} Logo" class="mx-auto" />
				</a>
			{/each}
		</div>
	</div>
</div>
