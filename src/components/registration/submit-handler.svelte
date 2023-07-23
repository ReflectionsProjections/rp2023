<script lang="ts">
    export let onSubmit: () => Promise<string[]>;
    export let fileData: File;
  
    const HandleClick = async () => {
      const [attendeeName, attendeeId] = await onSubmit();
  
      if (fileData) {
        const formData = new FormData();
        formData.append('file', fileData);
        formData.append('attendeeName', attendeeName);
        formData.append('attendeeId', attendeeId);
        
        try {
          const response = await fetch(`http://localhost:3000/attendee/upload`, {
            method: 'POST',
            body: formData
          });

          console.log(response);
  
          if (!response.ok) {
            throw new Error('Error fetching pre-signed URL: ' + response);
          }
  
        } catch (error) {
            console.log(error);
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
  