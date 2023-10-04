// Function for rendering all the characters individually
const renderingCharacters = () =>{
  const characters = document.getElementById('character-bar')

  fetch('http://localhost:3000/characters')

  .then(response=> response.json())
// Iterates through each animal and passes a function to them
  .then(data => {
    data.forEach(animal => {
      // Creates a new element to display a list of animals
      const characterList = document.createElement('li')
      characterList.textContent = animal.name;

      // Creates a function for what happens when an animal is clicked
      characterList.addEventListener('click', () => {
        console.log('click', animal.name )

        // Creates variable for image,name and vote
        const characterImage = document.getElementById("image")
        const characterName = document.getElementById("name")
        const characterVote = document.getElementById('vote-count')

        // Assigns value to the variables from server
        characterImage.src = animal.image;
        characterName.innerText = animal.name;
        characterVote.innerText = animal.votes;

        let currentVote = parseInt(characterVote.textContent, 10);
       
        const form =  document.getElementById("votes-form")
        const voteInput = document.getElementById("votes")
        
        // Function for adding votes
        form.addEventListener('submit',(e)=> {
          e.preventDefault ()
          // Null, Nan, Undefined not returned
          if (!voteInput.value) return;
          
          let newVote = parseInt(voteInput.value, 10);
          currentVote += newVote;
          characterVote.textContent = currentVote;
          form.reset();
        
        })

        // Function for resetting votes
        const reset = document.getElementById("reset-btn");

        reset.addEventListener('click', () => {
          characterVote.textContent = 0;
        })

      })
      characters.appendChild(characterList)
    })
  });

}
renderingCharacters();