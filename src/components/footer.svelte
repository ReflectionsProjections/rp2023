<script>
	import Icon from '@iconify/svelte';
</script>

<div class="relative">
	<span class="px-5 absolute bottom-0 flex flex-row justify-between w-full mt-4 py-4 items-center">
		<div class=" text-white text-xs sm:text-sm md:text-base">
			<a href="https://acm.illinois.edu/">
				<img 
				src="/acmuiuclogo.png" 
				alt = "acm-logo"
				width="100"
				>
			</a>
		</div>
		<div class="flex flex-row justify-around">
			<a href="https://www.instagram.com/uiuc_rp/?hl=en">
				<Icon
					icon="ri:instagram-fill"
					class="text-xl md:text-3xl text-gray-200 hover:text-gray-400 duration-200 inline mx-2"
					title="Instagram"
				/>
			</a>

			<a href="https://www.linkedin.com/company/reflections-projections-uiuc/">
				<Icon
					icon="ri:linkedin-fill"
					class="text-xl md:text-3xl text-gray-200 hover:text-gray-400 duration-200 inline mx-2"
					title="LinkedIn"
				/>
			</a>

			<a href="https://twitter.com/uiuc_rp?lang=en">
				<Icon
					icon="ri:twitter-fill"
					class="text-xl md:text-3xl text-gray-200 hover:text-gray-400 duration-200 inline mx-2"
					title="Twitter"
				/>
			</a>

			<a href="https://www.facebook.com/acmrp/">
				<Icon
					icon="ri:facebook-fill"
					class="text-xl md:text-3xl text-gray-200 hover:text-gray-400 duration-200 inline mx-2"
					title="Facebook"
				/>
			</a>

			<a href="mailto:contact@reflectionsprojections.org">
				<Icon
					icon="ri:mail-line"
					class="text-xl md:text-3xl text-gray-200 hover:text-gray-400 duration-200 inline mx-2"
					title="Email"
				/>
			</a>
		</div>
	</span>
</div>
