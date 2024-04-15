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
const phonesList = document.getElementById('phonesList');

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
  const selectedValues = new Set();
  let validSubmission = true;

  for (let i = 0; i < phones.length; i++) {
    const input = document.getElementById(`phone${i}`);
    const value = parseInt(input.value);
    
    if (selectedValues.has(value)) {
      alert('Please assign different numbers for each cellphone.');
      validSubmission = false;
      break;
    } else {
      selectedValues.add(value);
    }
  }

  if (validSubmission) {
    // Here you can send the data to your server or perform any other action
    console.log('Survey submitted successfully');
    form.reset();
  }
});
