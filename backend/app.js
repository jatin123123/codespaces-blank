const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Book = require("./model/bookSchema");

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from the frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
}));
app.use(express.json()); // Middleware to parse JSON data

// Routes
// Create a new book
app.post("/create", async (req, res) => {
    console.log("Request Body:", req.body);
    try {
        const { imageurl, title, description } = req.body;
        if (!imageurl || !title || !description) {
            return res.status(400).send("All fields are required.");
        }

        const newBook = new Book({
            imageurl,
            title,
            description,
        });
        await newBook.save();
        res.status(201).send("Book Created Successfully");
    } catch (error) {
        console.error("Error in Creating New Book:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Get all books
app.get("/allbooks", async (req, res) => {
    try {
        const allbooks = await Book.find();
        res.status(200).json(allbooks);
    } catch (error) {
        console.error("Error in Fetching Books:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Default route
app.get("/", (req, res) => {
    res.send("Hello, Welcome to the Book Inventory Manager!");
});

module.exports = app;
