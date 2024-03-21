let dragged;
let touchStartX;
let touchStartY;
let offsetX;
let offsetY;

document.addEventListener("dragstart", function(event) {
  dragged = event.target;
});

document.addEventListener("dragover", function(event) {
  event.preventDefault();
});

document.addEventListener("drop", function(event) {
  event.preventDefault();
  const target = event.target.closest('.card');
  if (!target || target === dragged) return;
  const targetContainer = target.closest('.card-container');
  const draggedContainer = dragged.closest('.card-container');
  if (targetContainer === draggedContainer) {
    const targetRect = target.getBoundingClientRect();
    const shouldMoveDown = event.clientY > (targetRect.top + targetRect.height / 2);
    if (shouldMoveDown) {
      target.parentNode.insertBefore(dragged, target.nextSibling);
    } else {
      target.parentNode.insertBefore(dragged, target);
    }
    updateMarkers(targetContainer);
  }
});

document.addEventListener("touchstart", function(event) {
  if (event.target.classList.contains('card')) {
    dragged = event.target;
    const rect = dragged.getBoundingClientRect();
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    offsetX = touchStartX - rect.left;
    offsetY = touchStartY - rect.top;
    // Add transition effect
    dragged.style.transition = 'none';
  }
});

document.addEventListener("touchmove", function(event) {
  event.preventDefault();
  if (!dragged) return;
  const newX = event.touches[0].clientX - offsetX;
  const newY = event.touches[0].clientY - offsetY;
  dragged.style.transform = `translate(${newX}px, ${newY}px)`;
});

document.addEventListener("touchend", function(event) {
  if (!dragged) return;
  const target = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY).closest('.card');
  if (!target || target === dragged) return;
  const targetContainer = target.closest('.card-container');
  const draggedContainer = dragged.closest('.card-container');
  if (targetContainer === draggedContainer) {
    const targetRect = target.getBoundingClientRect();
    const shouldMoveDown = event.changedTouches[0].clientY > (targetRect.top + targetRect.height / 2);
    if (shouldMoveDown) {
      target.parentNode.insertBefore(dragged, target.nextSibling);
    } else {
      target.parentNode.insertBefore(dragged, target);
    }
    updateMarkers(targetContainer);
  }
  // Reset transition
  dragged.style.transition = '';
  dragged.removeAttribute('style');
});

function updateMarkers(container) {
  const cards = container.querySelectorAll('.card');
  let markerValue = 1;
  cards.forEach((card, index) => {
    card.setAttribute('data-index', markerValue);
    markerValue++;
  });
}

function submitOrder() {
  const orderedItemsQuestion1 = getOrderedItems("#question1-container");
  const orderedItemsQuestion2 = getOrderedItems("#question2-container");
  console.log("Ordered Items for Question 1:", orderedItemsQuestion1);
  console.log("Ordered Items for Question 2:", orderedItemsQuestion2);
}

function getOrderedItems(containerId) {
  const container = document.querySelector(containerId);
  const cards = container.querySelectorAll('.card p');
  const orderedItems = [];
  cards.forEach(card => {
    orderedItems.push(card.innerText.trim());
  });
  return orderedItems;
}

updateMarkers(document.querySelector("#question1-container"));
updateMarkers(document.querySelector("#question2-container"));
