const User = require("../models/User");
const QRCode = require("qrcode");

// Show Registration Form
const showRegistrationForm = (req, res) => {
    res.render("register");
};

// Handle User Registration
const registerUser = async (req, res) => {
    try {
        // Extract data from the request body
        const { name, phone, email, district, adhaar, viewing } = req.body;

        // Check if the required fields are provided
        if (!name || !phone || !email || !district || !adhaar || !viewing) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user already exists based on email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create QR Code data as a valid JSON object
        const qrData = {
            name,
            email,
            phone,
            adhaar,
            district,
            viewing
        };

        // Convert the JSON object to a string
        // Convert the user data to JSON and encode it for the URL
        const dataString = encodeURIComponent(JSON.stringify(qrData));

        // Generate the QR code URL using QuickChart's API
        const qrCodeUrl = `https://quickchart.io/qr?size=150x150&text=${dataString}`;
        // Generate QR Code with Base64 data

        // Create a new user document based on the received data
        const newUser = new User({
            name,
            phone,
            email,
            district,
            adhaar,
            viewing,
            qrCodeUrl  // Save QR code URL in the user document
        });

        // Save the new user document to the database
        await newUser.save();

        // Respond with the user data and QR code URL
        res.render("userqr", { user: newUser, qrCode: qrCodeUrl });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Fetch All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch Single User
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update User
const updateUser = async (req, res) => {
    try {
        const { name, phone, email, address } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, phone, email, address },
            { new: true }
        );
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    showRegistrationForm,
    registerUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
