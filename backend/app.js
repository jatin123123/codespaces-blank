const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Book = require("./model/bookSchema");
const User = require("./model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
app.use(cookieParser());
// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow requests from the frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  })
);
app.use(express.json()); // Middleware to parse JSON data

const authenticateUser = (req, res, next) => {
  const token = req.cookies.token; // Retrieve the token from cookies
  if (!token) {
    return res.status(401).json("Access Denied: No token provided");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "shhhh");
    req.user = verified; // Attach user data to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(403).json("Invalid or Expired Token");
  }
};

app.get("/verify",async(req,res)=>{
  const token = req.cookies.token; // Retrieve the token from cookies
  const verified = jwt.verify(token, process.env.JWT_SECRET || "shhhh");
  // console.log(verified)
  const user=await User.findById(verified._id);
  // console.log(user)
    res.status(200).json(user)
})

const user = async (req, res, next) => {
  const token = req.cookies.token; // Retrieve the token from cookies
  if (!token) {
    return res.status(401).json("Access Denied: No token provided");
  }
  try {
    const decoded = jwt.verify(token, "shhhh");
    req.user = decoded; // Attach the decoded user to the request for later use
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json("Invalid token");
  }
};


// Routes
// Signup Route
app.post("/signup", async (req, res) => {
  const { userName, email, password, userImage } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.send("User Found");
  } else {
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hash,
      userImage,
    });
    await newUser.save();
    res.json("User Created Successfully");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("User not found");
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json("Wrong Password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET || "shhhh",
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true, // Prevent access via JavaScript
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "Strict", // Protect against CSRF
      maxAge: 3600000, // 1 hour in milliseconds
    });

    res.status(200).json("User logged in successfully");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json("Internal Server Error");
  }
});

// Create a new book
app.post("/create", user, async (req, res) => {
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
      user: req.user._id, // Link book to the authenticated user
    });

    await newBook.save();
    res.status(201).send("Book Created Successfully");
  } catch (error) {
    console.error("Error in Creating New Book:", error);
    res.status(500).send("Internal Server Error");
  }
});

// userProfile Route
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(" userImage userName email"); // Fetch only required fields
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user); // Respond with user data
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Get all books
app.get("/feed", authenticateUser, async (req, res) => {
  try {
    const allbooks = await Book.find();
    res.status(200).json(allbooks);
  } catch (error) {
    console.error("Error in Fetching Books:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/detail/:id", async (req, res) => {
  const { id } = req.params; // Extract ID from URL params

  try {
    const book = await Book.findById(id); // Fetch book by ID
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    const userid=book.user;
    const profile=await User.findById(userid);
    // console.log(profile);
    res.status(200).json({book,profile});
  } catch (err) {
    console.error("Error fetching book:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteBook = await Book.findByIdAndDelete(id);
    res.json("Book Deleted successfully");
  } catch (error) {
    console.log("Error in deleting Book", error);
  }
});

app.post("/update/:id", async (req, res) => {
  const { id } = req.params; // Get the book ID from the URL parameters
  const { imageurl, title, description } = req.body; // Get the new data from the request body

  // Prepare an update object
  const updateData = {};

  // Only add fields to the update object if they are provided
  if (imageurl) updateData.imageurl = imageurl;
  if (title) updateData.title = title;
  if (description) updateData.description = description;

  try {
    // Find the book by its ID and update it
    const updatedBook = await Book.findByIdAndUpdate(
      id, // Book ID to find the specific book
      updateData, // Only the provided data will be updated
      { new: true } // Return the updated book
    );

    if (!updatedBook) {
      return res.status(404).send("Book not found");
    }

    res.status(200).send("Book updated successfully");
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Hello, Welcome to the Book Inventory Manager!");
});

module.exports = app;
