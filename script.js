const phones = [
  "iPhone 13",
  "Samsung Galaxy S21",
  "Google Pixel 6",
  "OnePlus 9 Pro",
  "Xiaomi Mi 11",
  "Sony Xperia 1 III",
  "Huawei P40 Pro",
  "LG Velvet",
  "Motorola Edge+",
  "Nokia 8.3",
  "Oppo Find X3 Pro",
  "Vivo X60 Pro+",
  "Asus ROG Phone 5",
  "Realme GT",
  "Lenovo Legion Phone Duel 2",
  "BlackBerry Key2"
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
