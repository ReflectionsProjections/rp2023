<script>
	import PdfViewer from 'svelte-pdf';
</script>

<div class="m-10">
	<h1 class=" text-3xl flex text-white justify-center">Reflections | Projections Sponsor Guide</h1>
	<div class="flex justify-center text-white">
		<PdfViewer
			url="../R_P_2023_Sponsor_Doc.pdf"
			scale={1.3}
			data={undefined}
			showBorder={false}
			showButtons={['navigation', 'zoom', 'print', 'download', 'pageInfo']}
		/>
	</div>
</div>
