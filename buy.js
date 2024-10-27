// Fetch and display items on the buy page
function loadItems() {
  fetch('/buy')
    .then(response => response.json())
    .then(items => {
      const itemsList = document.getElementById('items-list');
      itemsList.innerHTML = ''; // Clear previous items

      items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        itemDiv.innerHTML = `
          <h3>${item.name}</h3>
          <p>Price: $${item.price.toFixed(2)}</p>
          <p>Quantity: ${item.quantity}</p>
          <p>Room Number: ${item.roomNumber}</p>
          <p>Phone Number: ${item.phoneNumber}</p>
          <p>Description: ${item.description}</p>
          ${item.image ? `<img src="${item.image}" alt="${item.name}" class="item-image">` : ''}
          <button onclick="buyItem('${item.name}')">Buy</button>
        `;

        itemsList.appendChild(itemDiv);
      });
    })
    .catch(error => console.error('Error fetching items:', error));
}

// Buy an item
function buyItem(itemName) {
  fetch(`/buy/${itemName}`, {
    method: 'POST'
  })
  .then(response => {
    if (response.ok) {
      alert('Item purchased successfully!');
      loadItems(); // Refresh the item list after purchase
    } else {
      alert('Failed to purchase item. It might be out of stock.');
    }
  })
  .catch(error => console.error('Error buying item:', error));
}

// Load items when the page loads
window.onload = loadItems;
