let dragged;
let touchStartY;

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
  touchStartY = event.touches[0].clientY;
});

document.addEventListener("touchmove", function(event) {
  event.preventDefault();
  const touchMoveY = event.touches[0].clientY;
  const touchDirection = touchMoveY - touchStartY;
  if (Math.abs(touchDirection) > 10) {
    dragged.style.transform = `translateY(${touchDirection}px)`;
  }
});

document.addEventListener("touchend", function(event) {
  const target = event.target.closest('.card');
  if (!target || target === dragged) return;
  const targetContainer = target.closest('.card-container');
  const draggedContainer = dragged.closest('.card-container');
  if (targetContainer === draggedContainer) {
    const targetRect = target.getBoundingClientRect();
    const touchEndY = event.changedTouches[0].clientY;
    const shouldMoveDown = touchEndY > (targetRect.top + targetRect.height / 2);
    if (shouldMoveDown) {
      target.parentNode.insertBefore(dragged, target.nextSibling);
    } else {
      target.parentNode.insertBefore(dragged, target);
    }
    updateMarkers(targetContainer);
  }
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