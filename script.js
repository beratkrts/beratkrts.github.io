document.addEventListener('DOMContentLoaded', function() {
  const phones = [
    "Apple, 512 GB, 12 GB RAM, 50000 TL",
    "Apple, 256GB, 12 GB RAM, 50000 TL",
    "Apple, 512 GB, 8 GB RAM, 50000 TL",
    "Apple, 256 GB, 8 GB RAM, 50000 TL",
    "Apple, 512 GB, 12 GB RAM, 80000 TL",
    "Apple, 256GB, 12 GB RAM, 80000 TL",
    "Apple, 512 GB, 8 GB RAM, 80000 TL",
    "Apple, 256 GB, 8 GB RAM, 80000 TL",
    "Samsung, 512 GB, 12 GB RAM, 50000 TL",
    "Samsung, 256GB, 12 GB RAM, 50000 TL",
    "Samsung, 512 GB, 8 GB RAM, 50000 TL",
    "Samsung, 256 GB, 8 GB RAM, 50000 TL",
    "Samsung, 512 GB, 12 GB RAM, 80000 TL",
    "Samsung, 256GB, 12 GB RAM, 80000 TL",
    "Samsung, 512 GB, 8 GB RAM, 80000 TL",
    "Samsung, 256 GB, 8 GB RAM, 80000 TL"
  ];

   const form = document.getElementById('surveyForm');

  phones.forEach((phone, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <label for="phone${index}">${phone}</label>
      <input type="number" id="phone${index}" name="phone${index}" min="1" max="16" required>
    `;
    phonesList.appendChild(listItem);
  });

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Disable the submit button to prevent multiple submissions
    const submitButton = form.querySelector('.btn-submit');
    submitButton.disabled = true;

    // Get survey data from the form
    const formData = {
      gender: document.getElementById('gender').value,
      age: document.getElementById('age').value,
      faculty: document.getElementById('faculty').value,
      phoneRankings: []
    };

    // Collect phone rankings
    const assignedNumbers = new Set(); // Set to store assigned numbers
    let isInvalid = false;

    for (let i = 0; i < phones.length; i++) {
      const input = document.getElementById(`phone${i}`);
      const value = parseInt(input.value);

      if (formData.phoneRankings.includes(value)) {
        // If the same number is assigned to different phones, mark it as invalid
        isInvalid = true;
        break;
      }

      if (value < 1 || value > 16 || isNaN(value)) {
        // If the assigned number is not within the valid range or is not a number, mark it as invalid
        isInvalid = true;
        break;
      }

      // Add the assigned number to the set
      assignedNumbers.add(value);
      formData.phoneRankings.push(value);
    }

    if (isInvalid || assignedNumbers.size !== formData.phoneRankings.length) {
      // If there are invalid assignments or duplicate numbers, enable the submit button and do not proceed with form submission
      submitButton.disabled = false;
      alert('Please assign unique numbers from 1 to 16 to each phone.');
      return;
    }

    // Make a POST request to submit the survey
    fetch('https://us-central1-survey2-89893.cloudfunctions.net/app/submit-survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      console.log(data); // Log success message from the server
      // Redirect to the acknowledgement page
      window.location.href = "acknowledgement.html";
    })
    .catch(error => {
      console.error('Error submitting survey:', error.message);
      // Re-enable the submit button in case of error
      submitButton.disabled = false;
      // Handle error - display a message to the user or perform any other action
      alert('Error submitting survey. Please try again later.');
    });
  });
});
