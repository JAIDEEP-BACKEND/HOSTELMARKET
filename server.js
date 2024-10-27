const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const items = []; // In-memory storage for items

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the filename
  },
});

const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(express.static('public'));

// Route to list items for sale
app.post('/sell', upload.single('image'), (req, res) => {
  const item = {
    name: req.body.name,
    price: parseFloat(req.body.price),
    roomNumber: req.body.roomNumber,
    quantity: parseInt(req.body.quantity, 10),
    phoneNumber: req.body.phoneNumber, // New field for phone number
    description: req.body.description, // New field for description
    sold: false,
    image: req.file ? `/uploads/${req.file.filename}` : null, // Set image path if uploaded
  };
  
  items.push(item);
  res.status(201).send({ message: 'Item listed successfully!', item });
});

// Route to fetch all available items for buying
app.get('/buy', (req, res) => {
  const availableItems = items.filter(item => !item.sold); // Only return unsold items
  res.status(200).send(availableItems);
});

// Route to handle item purchase
app.post('/buy/:name', (req, res) => {
  const { name } = req.params;
  const item = items.find(item => item.name === name && !item.sold);

  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1; // Decrease quantity
    } else {
      item.sold = true; // Mark as sold when quantity reaches 0
    }
    res.status(200).send({ message: 'Item purchased successfully!' });
  } else {
    res.status(404).send({ message: 'Item out of stock or not found.' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
