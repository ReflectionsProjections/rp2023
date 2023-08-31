<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageIndex, PageMeta } from './page-meta.type';

	export let page: PageIndex;
	export let pageMeta: PageMeta;
	export let formValues: any = {};
	export let validate: () => Promise<boolean>;

	const FIRST_PAGE: PageIndex = 'welcome';
	const LAST_PAGE: PageIndex = 'emailVerification';

	$: isCollegeStudent = formValues?.isCollegeStudent === 'yes';

	$: next = pageMeta[page]?.next(isCollegeStudent);
	$: prev = pageMeta[page]?.prev(isCollegeStudent);
</script>

<div class="flex flex-row gap-5 justify-between mx-2">
	{#if page !== FIRST_PAGE}
		<button aria-label="previous page" title="previous page" on:click={() => (page = prev)}>
			<Icon icon="ic:round-navigate-before" class="text-3xl text-white" />
		</button>
	{:else}
		<div />
	{/if}

	{#if page !== LAST_PAGE && next}
		<button
			aria-label="next page"
			title="next page"
			on:click={async () => {
				if (await validate()) page = next ? next : page;
			}}
		>
			<Icon icon="ic:round-navigate-next" class="text-3xl text-white" />
		</button>
	{:else}
		<div />
	{/if}
</div>
