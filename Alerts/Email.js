import { configDotenv } from 'dotenv';
import nodemailer from 'nodemailer'
configDotenv();
console.log(process.env.passkey,process.env.email)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
            port: 587,
            secure: false, 
            auth: {
                user: process.env.email,
                pass: process.env.passkey,
            },
});


const sendEmailAlert = async (campaign) => {
    try {
        let message = {
            from: process.env.email,
            to: process.env.email1,
            subject: `Budget Alert for Campaign: ${campaign.name}`,
            text: `The campaign ${campaign.name} has exceeded the budget threshold. Current budget: ${campaign.budget}`
        };

        await transporter.sendMail(message);
        console.log(`Alert email sent for campaign ${campaign.name}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
export default sendEmailAlert;