const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    // name: { type: String, required: true },
    // phone: { type: String, required: true },
    // adhaar: { type: Number, required: true },
    // email: { type: String, required: true, unique: true },
    // district: { type: String, required: true },
    // viewing: { type: String, required: true },
    // interestedin: [{ type: String, }],
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    adhaar: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^([\w-]+(?:\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7})$/, 'Please fill a valid email address']
    },
    district: {
        type: String,
        required: true,
        enum: [
            "Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua",
            "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi",
            "Samba", "Shopian", "Srinagar", "Udhampur"
        ]
    },
    viewing: {
        type: String,
        required: true,
        enum: [
            "Farmer", "Student", "Entrepreneur", "Research/Academic",
            "Industry professional", "General visitor"
        ]
    },
});

module.exports = mongoose.model("User", UserSchema);
