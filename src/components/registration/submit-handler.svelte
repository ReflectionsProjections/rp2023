<script lang="ts">
    export let onSubmit: () => Promise<string[]>;
    export let fileData: File;
  
    const HandleClick = async () => {
      const presignedURL = await onSubmit();
  
      if (fileData) {
        
        try {
            const reader = new FileReader();
            reader.readAsArrayBuffer(fileData);

            reader.onload = async () => {
                const blob = new Blob([reader.result as ArrayBuffer]);

                const response = await fetch(presignedURL, {
                    method: 'PUT',
                    body: blob,
                    headers: {
                    'Content-Type': fileData.type,
                    },
                });

                return { success: true, message: 'File uploaded successfully' };
            };
        } catch (error) {
            throw new Error('Failed to upload file');
        }
      }
    };
  </script>
    
  <button
    type="submit"
    class="mx-auto disabled:opacity-25 disabled:cursor-not-allowed duration-500 bg-white bg-opacity-30 text-white px-3 py-2 m-3 rounded-md flex gap-2 border border-white"
    id="submit-button"
    on:click={HandleClick}
  >
    Submit
  </button>
  