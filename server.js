const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

app.post('/submit-form', (req, res) => {
    const { name, phone, email, course } = req.body;

    // Create a transporter for sending email
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    // Email options
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'your-notification-email@example.com',
        subject: 'New Course Inquiry',
        text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nCourse: ${course}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email');
        }
        res.send('Form submitted successfully');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
