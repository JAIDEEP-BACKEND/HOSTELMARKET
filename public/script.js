document.getElementById('sellForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  const formData = new FormData(this); // Collect form data

  fetch('/sell', {
    method: 'POST',
    body: formData, // Send form data including file
  })
    .then(response => {
      if (response.ok) {
        alert('Item listed successfully!');
        this.reset(); // Reset form fields
      } else {
        alert('Failed to list item.');
      }
    })
    .catch(error => console.error('Error listing item:', error));
});
