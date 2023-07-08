<script lang="ts">
	import Icon from '@iconify/svelte';

	export let marketingOther = '';
</script>

<div class="flex-col flex">
	<div class="flex flex-row">
		<button
			class="flex rounded-tl-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {marketingOther ===
			'ACM Open House'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={() => {
				marketingOther = 'ACM Open House';
			}}
		>
			<Icon class="text-xl" icon="lucide:vegan" />
			<div>ACM Open House</div>
		</button>
		<button
			class="flex rounded-tr-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {marketingOther ===
			'Building Ads'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={() => {
				marketingOther = 'Building Ads';
			}}
		>
			<Icon
				class="text-xl"
				icon="streamline:food-cherries-cook-plant-cherry-plants-drink-cooking-nutrition-vegetarian-fruit-food"
			/>
			<div>Building Ads</div>
		</button>
	</div>
	<div class="flex flex-row">
		<button
			class="flex rounded-bl-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {marketingOther ===
			'Courses'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={() => {
				marketingOther = 'Courses';
			}}
		>
			<Icon class="text-xl" icon="mdi:gluten-free" />
			<div>Courses</div>
		</button>
		<button
			class="flex rounded-br-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {marketingOther ===
			'Instagram'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={() => {
				marketingOther = 'Instagram';
			}}
		>
			<Icon class="text-xl" icon="icon-park-twotone:good-one" />
			<div>Instagram</div>
		</button>
        <button
			class="flex rounded-tl-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {marketingOther ===
			'Email'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={() => {
				marketingOther = 'Email';
			}}
		>
			<Icon class="text-xl" icon="lucide:vegan" />
			<div>Email</div>
		</button>
		<button
			class="flex rounded-tr-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {marketingOther ===
			'Posters'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={() => {
				marketingOther = 'Posters';
			}}
		>
			<Icon
				class="text-xl"
				icon="streamline:food-cherries-cook-plant-cherry-plants-drink-cooking-nutrition-vegetarian-fruit-food"
			/>
			<div>Posters</div>
		</button>
	</div>
	<div class="flex flex-row">
		<button
			class="flex rounded-bl-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {marketingOther ===
			'Website'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={() => {
				marketingOther = 'Website';
			}}
		>
			<Icon class="text-xl" icon="mdi:gluten-free" />
			<div>Website</div>
		</button>
		<button
			class="flex rounded-br-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {marketingOther ===
			'Word-of-Mouth'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={() => {
				marketingOther = 'Word-of-Mouth';
			}}
		>
			<Icon class="text-xl" icon="icon-park-twotone:good-one" />
			<div>Word-of-Mouth</div>
		</button>
	</div>
</div>
