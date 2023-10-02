// Your code here

document.addEventListener('DOMContentLoaded', () => {
    const characterBar = document.querySelector('#character-bar');
    const characterInfo = document.querySelector('.characterInfo');
  
    function showAnimalDetails(animal) {
   
      characterInfo.innerHTML = '';
  

      const name = document.createElement('p');
      name.textContent = animal.name;
  
      const image = document.createElement('img');
      image.src = animal.image;
      image.alt = animal.name;
  
      const voteCount = document.createElement('h4');
      voteCount.textContent = `Total Votes: ${animal.votes}`;
  
   
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

    
      votesForm.appendChild(votesInput);
      votesForm.appendChild(submitButton);
  
      characterInfo.appendChild(name);
      characterInfo.appendChild(image);
      characterInfo.appendChild(voteCount);
      characterInfo.appendChild(votesForm);

     
      votesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const votesToAdd = parseInt(votesInput.value) || 0;
  
        
        animal.votes += votesToAdd;
        voteCount.textContent = `Total Votes: ${animal.votes}`;
  
       
        votesInput.value = '';
      });

    }

 
    function fetchAnimals() {
      fetch('http://localhost:3000/characters')
        .then((res) => res.json())
        .then((animals) => {
        
          animals.forEach((animal) => {
            const animalName = document.createElement('li');
            animalName.className = 'characterList';
            animalName.textContent = animal.name;
  
           
            animalName.addEventListener('click', () => {
              showAnimalDetails(animal);
            });
  

            characterBar.appendChild(animalName);
          });
        });
    }
  
    
    fetchAnimals();
});
