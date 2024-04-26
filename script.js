document.addEventListener('DOMContentLoaded', function () {
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
    const coffees = [
        "Starbucks, Sugary-flavored, Ice, 75 TL (Medium)",
        "Starbucks, Sugary-flavored, Ice, 105 TL (Large)",
        "EspressoLab, Sugary-flavored, Ice, 75 TL (Medium)",
        "EspressoLab, Sugary-flavored, Ice, 105 TL (Large)",
        "Starbucks, Classic-strong, Ice, 75 TL (Medium)",
        "Starbucks, Classic-strong, Ice, 105 TL (Large)",
        "EspressoLab, Classic-strong, Ice, 75 TL (Medium)",
        "EspressoLab, Classic-strong, Ice, 105 TL (Large)",
        "Starbucks, Sugary-flavored, Hot, 75 TL (Medium)",
        "Starbucks, Sugary-flavored, Hot, 105 TL (Large)",
        "EspressoLab, Sugary-flavored, Hot, 75 TL (Medium)",
        "EspressoLab, Sugary-flavored, Hot, 105 TL (Large)",
        "Starbucks, Classic-strong, Hot, 75 TL (Medium)",
        "Starbucks, Classic-strong, Hot, 105 TL (Large)",
        "EspressoLab, Classic-strong, Hot, 75 TL (Medium)",
        "EspressoLab, Classic-strong, Hot, 105 TL (Large)",
    ];

    const form = document.getElementById('surveyForm');
    const submitButton = document.querySelector('.btn-submit');

    // Function to populate the list of phones
    function populatePhonesList() {
        const phonesList = document.getElementById('phonesList');
        phonesList.innerHTML = ""; // Clear previous content

        phones.forEach((phone, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <label for="phone${index}">${phone}</label>
                <input type="number" id="phone${index}" name="phone${index}" min="1" max="${phones.length}" required>
            `;
            phonesList.appendChild(listItem);
        });
    }

    // Function to populate the list of coffees
    function populateCoffeesList() {
        const coffeesList = document.getElementById('coffeesList');
        coffeesList.innerHTML = ""; // Clear previous content

        coffees.forEach((coffee, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <label for="coffee${index}">${coffee}</label>
                <input type="number" id="coffee${index}" name="coffee${index}" min="1" max="${coffees.length}" required>
            `;
            coffeesList.appendChild(listItem);
        });
    }

    // Call the functions to populate the lists
    populatePhonesList();
    populateCoffeesList();

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Disable the submit button to prevent multiple submissions
        submitButton.disabled = true;

        // Get survey data from the form
        const formData = {
            gender: document.getElementById('gender').value,
            age: document.getElementById('age').value,
            faculty: document.getElementById('faculty').value,
            phoneRankings: [],
            coffeeRankings: []
        };

        const assignedPhoneValues = new Set(); // Set to store assigned phone values
        const assignedCoffeeValues = new Set(); // Set to store assigned coffee values

        // Collect phone rankings
        for (let i = 0; i < phones.length; i++) {
            const input = document.getElementById(`phone${i}`);
            const value = parseInt(input.value);

            // Check if the value is already assigned
            if (assignedPhoneValues.has(value)) {
                alert("Please assign different numbers for each cellphone.");
                submitButton.disabled = false; // Re-enable the submit button
                return; // Stop form submission
            }

            assignedPhoneValues.add(value);
            formData.phoneRankings.push(value);
        }

        // Collect coffee rankings
        for (let i = 0; i < coffees.length; i++) {
            const input = document.getElementById(`coffee${i}`);
            const value = parseInt(input.value);

            // Check if the value is already assigned
            if (assignedCoffeeValues.has(value)) {
                alert("Please assign different numbers for each coffee.");
                submitButton.disabled = false; // Re-enable the submit button
                return; // Stop form submission
            }

            assignedCoffeeValues.add(value);
            formData.coffeeRankings.push(value);
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
                // Handle error - display a message to the user or perform any other action
                alert('Error submitting survey. Please try again later.');
                submitButton.disabled = false; // Re-enable the submit button
            });
    });
});
