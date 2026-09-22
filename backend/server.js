require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");

const User = require("./models/user");
const ServiceRequest = require("./models/ServiceRequest");
const SparePart = require("./models/SparePart");
const Order = require("./models/Order");
const Admin = require("./models/Admin");
const Mechanic = require("./models/Mechanic");

const app = express();

const bikeSparePartNames = [
    "Brake Pad", "Engine Oil", "Air Filter", "Spark Plug",
    "Piston and Piston Rings", "Cylinder Block and Cylinder Head",
    "Crankshaft and Connecting Rod", "Camshaft and Timing Chain / Tensioner",
    "Engine Valves (Intake and Exhaust) & Valve Guides", "Engine Oil Filter",
    "Gasket Set (Head Gasket, Crankcase Gasket)", "Clutch Plates (Friction Plates & Steel Plates)",
    "Clutch Clutch Bell / Clutch Hub", "Drive Belt / Variator Rollers (for Scooters / Automatic CVT)",
    "Drive Chain and Sprocket Kit (Front & Rear Sprockets)", "Gear Shift Lever & Shift Shaft",
    "Carburetor / Fuel Injector", "Fuel Pump and Fuel Filter",
    "Fuel Tank Cap & Fuel Petcock (Fuel Cock Valve)", "Air Filter Element",
    "Throttle Body & Sensors (TPS, MAP sensor)", "Intake Manifold / Carburetor Holder Rubber",
    "Front Brake Disc Rotor & Rear Disc Rotor", "Disc Brake Pads (Front & Rear)",
    "Drum Brake Shoes & Springs", "Brake Caliper Assembly & Caliper Repair Kit",
    "Brake Master Cylinder (Front & Rear)", "Brake Levers & Brake Pedal", "Brake Fluid Hose Pipes",
    "ABS Wheel Speed Sensor", "12V Motorcycle/Scooter Battery", "Starter Motor / Self Motor",
    "Alternator / Stator Coil", "Starter Relay & Solenoid", "Regulator/Rectifier (RR Unit)",
    "CDI (Capacitor Discharge Ignition) / ECU (Engine Control Unit)", "Ignition Coil & Spark Plug Cap",
    "Headlight Assembly (Halogen / LED)", "Tail Light / Brake Light Assembly", "Turn Signal Indicator Lights",
    "Horn", "Handlebar Switch Assemblies (Starter Switch, Dimmer Switch, Horn Switch)",
    "Speedometer / Digital Instrument Cluster", "Front Telescopic Fork Assembly",
    "Front Fork Oil Seals & Dust Caps", "Front Fork Inner Tubes (Pipes)",
    "Rear Shock Absorbers (Mono-shock & Twin-shocks)", "Steering Cone Set / Headstock Ball Bearings",
    "Swingarm Bushing & Bearings", "Handlebar & Handlebar Risers",
    "Tubeless Tyres & Tube-type Tyres (Front & Rear)", "Inner Tubes", "Alloy Wheels & Spoke Rims",
    "Wheel Bearings & Dust Seals", "Tyre Valves", "Clutch Cable", "Throttle / Accelerator Cable",
    "Front Brake Cable & Rear Brake Cable (for Drum Brakes/Scooters)", "Speedometer Cable", "Choke Cable",
    "Exhaust Pipe / Silencer / Muffler", "Exhaust Gasket / O-Ring",
    "Main Stand & Side Stand (with Return Springs)", "Footrests & Footpeg Rubbers (Rider and Pillion)",
    "Rear View Mirrors (Left and Right)", "Chassis Frame Mounts & Crash Guards", "Front Mudguard / Fender",
    "Rear Mudguard / Number Plate Holder", "Visor / Windshield", "Side Panels & Cowls",
    "Fuel Tank Cover / Tank Fairing",
    "Full Scooter Body Fiber/Plastic Panels (Apron, Floorboard, Underseat)", "Seat Assembly & Seat Cover",
    "4T Engine Oil & 2T Oil", "Front Fork Oil", "Brake Fluid (DOT 3 / DOT 4)", "Radiator Coolant",
    "Chain Lube and Cleaner Spray", "Fastener Kit (Bolts, Nuts, Washers, Fairing Screws, Clips)"
];

const bikeSpareParts = bikeSparePartNames.map((partName, index) => ({
    partName,
    description: `Two-wheeler replacement part for ${partName.toLowerCase()}`,
    price: [850, 600, 450, 250][index] || 300 + ((index * 175) % 4200),
    quantity: 10 + (index % 21)
}));

async function ensureBikeSpareParts() {
    const existingParts = await SparePart.find({
        partName: { $in: bikeSparePartNames }
    }).select("partName");
    const existingNames = new Set(existingParts.map((part) => part.partName));
    const missingParts = bikeSpareParts.filter((part) => !existingNames.has(part.partName));

    if (missingParts.length > 0) {
        await SparePart.insertMany(missingParts);
    }

    const allParts = await SparePart.find();
    const uniqueParts = new Map(allParts.map((part) => [part.partName, part]));

    return [...uniqueParts.values()];
}

app.use(cors());
app.use(express.json());


// ==================== MongoDB Connection ====================

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection failed");
        console.log(error);
    });


// ==================== Home ====================

app.get("/", (req, res) => {
    res.send("Welcome to DynaMech!");
});


// ==================== About ====================

app.get("/about", (req, res) => {
    res.send("DynaMech is a vehicle repair service platform.");
});


// ==================== Register User ====================

app.post("/api/register", async (req, res) => {
    try {

        const {
            name,
            email,
            password
        } = req.body;


        // Check if email already exists

        const existingUser = await User.findOne({
            email: email
        });

        if (existingUser) {
            return res.status(400).send(
                "Email already registered"
            );
        }


        // Hash password

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        // Create new user

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        });


        // Save user

        await newUser.save();


        res.send(
            "User registered successfully"
        );

    } catch (error) {

        console.log(error);

        res.status(500).send(
            "Registration failed"
        );
    }
});


// ==================== Login User ====================

app.post("/api/login", async (req, res) => {
    try {

        const {
            email,
            password
        } = req.body;


        // Find user

        const user = await User.findOne({
            email: email
        });


        // Check user

        if (!user) {
            return res.status(400).send(
                "User not found"
            );
        }


        // Check password

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!passwordMatch) {
            return res.status(400).send(
                "Incorrect password"
            );
        }


        res.send(
            "Login successful"
        );

    } catch (error) {

        console.log(error);

        res.status(500).send(
            "Login failed"
        );
    }
});


// ==================== Request a Mechanic ====================

app.post("/api/service-request", async (req, res) => {
    try {

        const {
            customerEmail,
            vehicle,
            vehicleType,
            problem,
            location,
            problemImages
        } = req.body;

        if (!customerEmail || !vehicle || !vehicleType || !problem || !location) {
            return res.status(400).send(
                "Customer email, vehicle, vehicle type, problem, and location are required"
            );
        }


        // Create service request

        const newRequest = new ServiceRequest({

            customerEmail: customerEmail,

            vehicle: vehicle,

            vehicleType: vehicleType,

            problem: problem,

            problemImages: Array.isArray(problemImages)
                ? problemImages.slice(0, 3)
                : [],

            location: location
        });


        // Save request

        await newRequest.save();


        const recommendedMechanics = await Mechanic.find({
            available: true,
            vehicleTypes: vehicleType
        }).select("name email vehicleTypes location rating completedJobs").limit(5);

        res.json({
            message: "Mechanic request submitted successfully",
            request: newRequest,
            recommendedMechanics: recommendedMechanics,
            guidance: "Simple repairs can be completed on-site. Complex repairs may require workshop support or towing."
        });

    } catch (error) {

        console.log(error);

        res.status(500).send(
            "Failed to submit mechanic request"
        );
    }
});


// ==================== My Requests ====================

app.get("/api/my-requests/:email", async (req, res) => {
    try {

        // Get customer email

        const email = req.params.email;


        // Find customer's requests

        const requests = await ServiceRequest.find({
            customerEmail: email
        });


        // Send requests to React

        res.json(requests);

    } catch (error) {

        console.log(error);

        res.status(500).send(
            "Failed to get requests"
        );
    }
});


// ==================== Spare Parts ====================


// Add spare part

app.post("/api/spare-parts", async (req, res) => {
    try {

        const {
            partName,
            description,
            price,
            quantity
        } = req.body;


        // Create spare part

        const newPart = new SparePart({

            partName: partName,

            description: description,

            price: price,

            quantity: quantity
        });


        // Save spare part

        await newPart.save();


        res.send(
            "Spare part added successfully"
        );

    } catch (error) {

        console.log(error);

        res.status(500).send(
            "Failed to add spare part"
        );
    }
});


// ==================== Orders ====================


// Create a new order

app.post("/api/orders", async (req, res) => {
    try {

        // Get order details from React

        const {
            customerEmail,
            partName,
            price,
            quantity
        } = req.body;


        // Find spare part

        const sparePart = await SparePart.findOne({
            partName: partName
        });


        // Check spare part

        if (!sparePart) {
            return res.status(404).send(
                "Spare part not found"
            );
        }


        // Check stock

        if (quantity > sparePart.quantity) {
            return res.status(400).send(
                "Not enough stock available"
            );
        }


        // Calculate total price

        const totalPrice = price * quantity;


        // Create order

        const newOrder = new Order({

            customerEmail: customerEmail,

            partName: partName,

            price: price,

            quantity: quantity,

            totalPrice: totalPrice
        });


        // Save order

        await newOrder.save();


        // Reduce stock

        sparePart.quantity =
            sparePart.quantity - quantity;


        // Save updated stock

        await sparePart.save();


        res.send(
            "Order placed successfully"
        );

    } catch (error) {

        console.log(error);

        res.status(500).send(
            "Failed to place order"
        );
    }
});


// Get customer's orders

app.get("/api/orders/:email", async (req, res) => {
    try {

        // Get customer email

        const email = req.params.email;


        // Find customer's orders

        const orders = await Order.find({
            customerEmail: email
        });


        // Send orders to React

        res.json(orders);

    } catch (error) {

        console.log(error);

        res.status(500).send(
            "Failed to get orders"
        );
    }
});


// ==================== Add Sample Spare Parts ====================

app.post("/api/add-sample-parts", async (req, res) => {
    try {
        await ensureBikeSpareParts();


        res.send(
            "Sample spare parts added successfully"
        );

    } catch (error) {

        console.log(error);

        res.status(500).send(
            "Failed to add sample parts"
        );
    }
});


// ==================== Get Spare Parts ====================

app.get("/api/spare-parts", async (req, res) => {
    try {
        const parts = await ensureBikeSpareParts();


        // Send parts to React

        res.json(parts);

    } catch (error) {

        console.log(error);

        res.status(500).send(
            "Failed to get spare parts"
        );
    }
});


// ==================== Admin ====================


// Create Admin

app.post("/api/create-admin", async (req, res) => {
    try {

        // Get admin details

        const {
            name,
            email,
            password
        } = req.body;


        // Check admin already exists

        const existingAdmin = await Admin.findOne({
            email: email
        });


        if (existingAdmin) {
            return res.status(400).send(
                "Admin already exists"
            );
        }


        // Hash admin password

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        // Create admin

        const newAdmin = new Admin({

            name: name,

            email: email,

            password: hashedPassword
        });


        // Save admin

        await newAdmin.save();


        res.send(
            "Admin created successfully"
        );

    } catch (error) {

        console.log(error);

        res.status(500).send(
            "Failed to create admin"
        );
    }
});


// ==================== Admin Login ====================

app.post("/api/admin-login", async (req, res) => {
    try {

        // Get admin login details

        const {
            email,
            password
        } = req.body;


        // Find admin

        const admin = await Admin.findOne({
            email: email
        });


        // Check admin

        if (!admin) {
            return res.status(400).send(
                "Admin not found"
            );
        }


        // Check admin password

        const passwordMatch = await bcrypt.compare(
            password,
            admin.password
        );


        if (!passwordMatch) {
            return res.status(400).send(
                "Incorrect password"
            );
        }


        res.send(
            "Admin login successful"
        );

    } catch (error) {

        console.log(error);

        res.status(500).send(
            "Admin login failed"
        );
    }
});


// ==================== Admin Service Requests ====================

// Get all customer service requests

app.get("/api/admin/requests", async (req, res) => {
    try {

        // Get all service requests

        const requests = await ServiceRequest.find();


        // Send requests to admin dashboard

        res.json(requests);

    } catch (error) {

        console.log(error);

        res.status(500).send(
            "Failed to get service requests"
        );
    }
});


// ==================== Mechanic Registration ====================

app.post("/api/mechanic/register", async (req, res) => {
    try {

        // Get mechanic details

        const {
            name,
            email,
            password,
            vehicleTypes,
            location
        } = req.body;


        // Check if mechanic already exists

        const existingMechanic = await Mechanic.findOne({
            email: email
        });


        if (existingMechanic) {
            return res.status(400).send(
                "Mechanic email already registered"
            );
        }


        // Hash mechanic password

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        // Create mechanic

        const newMechanic = new Mechanic({

            name: name,

            email: email,

            password: hashedPassword,

            vehicleTypes: vehicleTypes,

            location: location

        });


        // Save mechanic

        await newMechanic.save();


        res.send(
            "Mechanic registered successfully"
        );

    } catch (error) {

        console.log(error);

        res.status(500).send(
            "Mechanic registration failed"
        );
    }
});


// ==================== Test Route ====================

app.post("/test", (req, res) => {

    console.log(req.body);

    res.send(
        "Data received successfully"
    );
});


// ==================== Start Server ====================

app.listen(5000, () => {

    console.log(
        "DynaMech server is running on port 5000"
    );

});