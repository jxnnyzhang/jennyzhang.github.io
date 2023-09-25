const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const uri = "mongodb+srv://jxnnyzhang:oqxk3ELlWMft1ppd@portfoliojz.ojgvtv3.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

// Configure nodemailer to send emails
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'jxnnyzhang@gmail.com', // Your Gmail email address
    pass: '0802Zhang', // Your Gmail password or an app password if enabled
  },
});

async function run() {
  try {
    // Connect to the MongoDB database
    await client.connect();
    console.log("Connected to MongoDB");

    // Define the collection where you want to store contact form submissions
    const collection = client.db("mydb").collection("contacts");

    // Create a POST route to handle form submissions
app.post('/submit', async (req, res) => {
    const { name, email, message } = req.body;
  
    // Create a document to insert into the database
    const submission = {
      name,
      email,
      message,
      timestamp: new Date(),
    };
  
    // Insert the submission into the collection
    const result = await collection.insertOne(submission);
  
    if (result.insertedCount === 1) {
      console.log("Form submission saved to MongoDB");
  
      // Send an email with the form data
      const mailOptions = {
        from: 'your_email@gmail.com', // Your Gmail email address
        to: 'jxnnyzhang@gmail.com', // Recipient's email address
        subject: 'New Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Failed to send email:", error);
          res.status(500).send("Internal Server Error");
        } else {
          console.log("Email sent:", info.response);
  
          // Redirect to the "Thank You" page after successful submission
          res.redirect("thankyou.html"); // Replace with the actual path to your "Thank You" page
        }
      });
    } else {
      console.error("Failed to save form submission to MongoDB");
      res.status(500).send("Internal Server Error");
    }
  });

    // Start the Express server
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } finally {
    // Connection will be closed when the server is stopped
  }
}

run().catch(console.dir);
