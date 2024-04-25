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
  const coffee = [
      "Starbucks, Sugary-flavored, Ice, 75 TL",
      "Starbucks, Sugary-flavored, Ice,105 TL",
      "EspressoLab, Sugary-flavored, Ice, 75 TL",
      "EspressoLab, Sugary-flavored, Ice, 105 TL",
      "Starbucks, Classic-strong, Ice, 75 TL",
      "Starbucks, Classic-strong, Ice, 105TL",
      "EspressoLab, Classic-strong, Ice, 75 TL",
      "EspressoLab, Classic-strong, Ice, 105TL",
      "Starbucks, Sugary-flavored, Hot, 75 TL",
      "Starbucks, Sugary-flavored, Hot,105 TL",
      "EspressoLab, Sugary-flavored, Hot, 75 TL",
      "EspressoLab, Sugary-flavored, Hot, 105 TL",
      "Starbucks, Classic-strong, Hot, 75 TL",
      "Starbucks, Classic-strong, Hot, 105TL",
      "EspressoLab, Classic-strong, Hot, 75 TL",
      "EspressoLab, Classic-strong, Hot, 105TL",
  ]

  const form = document.getElementById('surveyForm');

  // Function to generate list items for phones and coffee
  function generateListItems(items, listElement) {
    items.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <label for="${listElement.id}${index}">${item}</label>
        <input type="number" id="${listElement.id}${index}" name="${listElement.id}${index}" min="1" max="16" required>
      `;
      listElement.appendChild(listItem);
    });
  }

  // Generate list items for phones and coffee
  generateListItems(phones, phonesList);
  generateListItems(coffee, coffeeList);

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
      phoneRankings: [],
      coffeeRankings: []
    };

      // Validate phone rankings
      const assignedPhoneNumbers = new Set();
      let isInvalid = false;

      for (let i = 0; i < phones.length; i++) {
          const input = document.getElementById(`phone${i}`);
          const value = parseInt(input.value);

          // Check if the input value is a valid number
          if (isNaN(value)) {
              isInvalid = true;
              break;
          }

          if (assignedPhoneNumbers.has(value)) {
              isInvalid = true;
              break;
          }

          if (value < 1 || value > 16) {
              isInvalid = true;
              break;
          }

          assignedPhoneNumbers.add(value);
          formData.phoneRankings.push(value);
      }

      // Validate coffee rankings
      const assignedCoffeeNumbers = new Set();

      for (let i = 0; i < coffee.length; i++) {
          const input = document.getElementById(`coffee${i}`);
          const value = parseInt(input.value);

          // Check if the input value is a valid number
          if (isNaN(value)) {
              isInvalid = true;
              break;
          }

          if (assignedCoffeeNumbers.has(value)) {
              isInvalid = true;
              break;
          }

          if (value < 1 || value > 16) {
              isInvalid = true;
              break;
          }

          assignedCoffeeNumbers.add(value);
          formData.coffeeRankings.push(value);
      }

      if (isInvalid ||
          assignedPhoneNumbers.size !== formData.phoneRankings.length ||
          assignedCoffeeNumbers.size !== formData.coffeeRankings.length) {
          submitButton.disabled = false;
          alert('Please assign unique numbers from 1 to 16 to each item.');
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
      window.location.href = "acknowledgement.html"; // Redirect to the acknowledgement page
    })
    .catch(error => {
      console.error('Error submitting survey:', error.message);
      submitButton.disabled = false;
      alert('Error submitting survey. Please try again later.');
    });
  });
});