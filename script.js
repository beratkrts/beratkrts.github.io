let dragged;
let touchStartX;
let touchStartY;
let offsetX;
let offsetY;
let pressTimer;
let originalPosition;

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
    pressTimer = setTimeout(() => {
      dragged = event.target;
      const rect = dragged.getBoundingClientRect();
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
      offsetX = touchStartX - rect.left;
      offsetY = touchStartY - rect.top;
      // Add transition effect
      dragged.style.transition = 'none';
      // Store original position
      originalPosition = { left: rect.left, top: rect.top };
    }, 500); // Adjust the duration as needed
  }
});

document.addEventListener("touchend", function(event) {
  clearTimeout(pressTimer);
  if (!dragged) return;
  const target = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY).closest('.card');
  if (!target || target === dragged) {
    dragged.style.transform = `translate(${originalPosition.left}px, ${originalPosition.top}px)`;
  }
  // Reset transition
  dragged.style.transition = '';
  dragged.removeAttribute('style');
  dragged = null;
});

document.addEventListener("touchmove", function(event) {
  event.preventDefault(); // Prevent scrolling on touch devices
  clearTimeout(pressTimer);
  if (!dragged) return;
  const containerRect = dragged.closest('.card-container').getBoundingClientRect();
  const newX = event.touches[0].clientX - offsetX;
  const newY = event.touches[0].clientY - offsetY - window.pageYOffset;
  dragged.style.transform = `translate(${newX}px, ${newY}px)`;
});

function updateMarkers(container) {
  const cards = container.querySelectorAll('.card');
  let markerValue = 1;
  cards.forEach((card, index) => {
    card.setAttribute('data-index', markerValue);
    markerValue++;
  });
}

updateMarkers(document.querySelector("#question1-container"));
updateMarkers(document.querySelector("#question2-container"));
