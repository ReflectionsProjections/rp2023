<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageIndex, PageMeta } from './page-meta.type';
	import type { boolStr } from './misc-types';
  
	export let page: PageIndex;
	export let pageMeta: PageMeta;
	export let formValues: any = {};
  
	$: isCollegeStudent = formValues?.isCollegeStudent === 'yes';
	$: numPages = Object.keys(pageMeta).length;
  
	let next: PageIndex | null = pageMeta[page]?.next(isCollegeStudent);
	console.log("original next:" + next);
	let prev: PageIndex = pageMeta[page]?.prev(isCollegeStudent);
  
	$: {
		const requiredFields = pageMeta[page]?.requiredFields;
		const isFormComplete = requiredFields && requiredFields.every(field => formValues[field] !== '');
		console.log("is form complete: " + isFormComplete);
		console.log('Before: next =', next);
		console.log('Before: prev =', prev);
		console.log('page: ', page);
		next = isFormComplete ? pageMeta[page]?.next(isCollegeStudent) : null;
		console.log('After: next =', next);
		prev = pageMeta[page]?.prev(isCollegeStudent);
		console.log('After: prev =', prev);
	}
  </script>
  
  <div class="flex flex-row gap-5 justify-between mx-2">
	{#if page !== 'welcome'}
	  <button
		aria-label="previous page"
		title="previous page"
		on:click={() => {
		  page = prev;
		}}
	  ><Icon icon="ic:round-navigate-before" class="text-3xl text-white" /></button>
	{:else}
	  <div />
	{/if}
  
	{#if page !== 'emailVerification'}
	  {#if next !== null}
		<button
		  aria-label="next page"
		  title="next page"
		  on:click={() => {
			if (next !== null) {
				page = next;
			}
		  }}
		><Icon icon="ic:round-navigate-next" class="text-3xl text-white" /></button>
	  <!-- {:else}
		<button disabled>Next</button> -->
	  {/if}
	{/if}
  </div>
  