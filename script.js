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
    submitButton.disabled = true;

    // Get survey data from the form
    const formData = {
      gender: document.getElementById('gender').value,
      age: document.getElementById('age').value,
      faculty: document.getElementById('faculty').value,
      phoneRankings: []
    };

    // Collect phone rankings
    for (let i = 0; i < phones.length; i++) {
      const input = document.getElementById(`phone${i}`);
      const value = parseInt(input.value);
      formData.phoneRankings.push(value);
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
