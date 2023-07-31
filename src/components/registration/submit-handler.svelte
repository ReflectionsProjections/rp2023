  <script lang="ts">

    export let verifyPasscode: () => Promise<boolean | undefined>;
    export let onSubmit: () => Promise<void>;
    export let fileData: File;
  
    const HandleClick = async () => {

      const passcodeSuccess = await verifyPasscode();

      if (passcodeSuccess) {
        await onSubmit();
  
        if (fileData) {
          const formData = new FormData();
          formData.append('file', fileData);

          fetch('http://localhost:3000/attendee/upload', {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'include',
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
      }
      
    };
  </script>
  
  <button
    type="submit"
    class="mx-auto disabled:opacity-25 disabled:cursor-not-allowed duration-500 bg-white bg-opacity-30 text-white px-3 py-2 m-3 rounded-md flex gap-2 border border-white"
    id="submit-button"
    on:click={HandleClick}>
    Submit
  </button>
  