<script lang="ts">

    export let onSubmit: () => Promise<string>;
    export let fileData: File;
    // export let attendeeId: string;
  
    const HandleClick = async () => {
      const attendeeId = await onSubmit();

      console.log("attendeeid: ", attendeeId);

      console.log("fileData:", fileData);
  
      if (fileData) {
        const formData = new FormData();
        formData.append('file', fileData);
        formData.append('attendeeId', attendeeId);

        console.log('File data:', formData);

        fetch('http://localhost:3000/attendee/upload', {
        method: 'POST',
        body: formData 
        })
        .then(function(response) {
            if (response.ok) {
            return response.text();
            }
            throw new Error('Error: ' + response.status);
        })
        .then(function(data) {
            alert('File uploaded successfully.');
        })
        .catch(function(error) {
            alert('An error occurred: ' + error.message);
        });
      }
    };

    $: {
        console.log('File data:', fileData);
    }
  </script>
  
  <button
    type="submit"
    class="mx-auto disabled:opacity-25 disabled:cursor-not-allowed duration-500 bg-white bg-opacity-30 text-white px-3 py-2 m-3 rounded-md flex gap-2 border border-white"
    id="submit-button"
    on:click={HandleClick}>
    Submit
  </button>
  