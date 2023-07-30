  <script lang="ts">

    export let onSubmit: () => Promise<void>;
    export let fileData: File;
  
    const HandleClick = async () => {
      // const attendeeId = await onSubmit();
      onSubmit();

      // console.log("attendeeid: ", attendeeId);

      console.log("fileData:", fileData);
  
      if (fileData) {
        const formData = new FormData();
        formData.append('file', fileData);
        // formData.append('attendeeId', attendeeId);

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
  