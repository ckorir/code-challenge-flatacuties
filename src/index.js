// Your code here
// Loads Function when Content has loaded
document.addEventListener('DOMContentLoaded', () => {
    const characterBar = document.querySelector('#character-bar');
    const characterInfo = document.querySelector('.characterInfo');
  
    function showAnimalDetails(animal) {
      // Clear previous details
      characterInfo.innerHTML = '';
  
      // Create elements for the animal details
      const name = document.createElement('p');
      name.textContent = animal.name;
  
      const image = document.createElement('img');
      image.src = animal.image;
      image.alt = animal.name;
  
      const voteCount = document.createElement('h4');
      voteCount.textContent = `Total Votes: ${animal.votes}`;
  
      // Create a form to add votes
      const votesForm = document.createElement('form');
      votesForm.id = 'votes-form';
  
      const votesInput = document.createElement('input');
      votesInput.type = 'text';
      votesInput.placeholder = 'Enter Votes';
      votesInput.id = 'votes';
      votesInput.name = 'votes';
  
      const submitButton = document.createElement('input');
      submitButton.type = 'submit';
      submitButton.value = 'Add Votes';

      // Append elements to the character details section
      votesForm.appendChild(votesInput);
      votesForm.appendChild(submitButton);
  
      characterInfo.appendChild(name);
      characterInfo.appendChild(image);
      characterInfo.appendChild(voteCount);
      characterInfo.appendChild(votesForm);

      // Handle form submission to add votes
      votesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const votesToAdd = parseInt(votesInput.value) || 0;
  
        // Update the vote count
        animal.votes += votesToAdd;
        voteCount.textContent = `Total Votes: ${animal.votes}`;
  
        // Clear the input field
        votesInput.value = '';
      });

    }

  // Fetches Data from the server
    function fetchAnimals() {
      fetch('http://localhost:3000/characters')
        .then((res) => res.json())
        .then((animals) => {
          // Create a list of animal names
          animals.forEach((animal) => {
            const animalName = document.createElement('li');
            animalName.className = 'characterList';
            animalName.textContent = animal.name;
  
            // Handle click event to show details
            animalName.addEventListener('click', () => {
              showAnimalDetails(animal);
            });
  

            characterBar.appendChild(animalName);
          });
        });
    }
  
    // Initialize the app
    fetchAnimals();
});
