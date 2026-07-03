import nodemailer from "nodemailer";
import { logger } from "@/helpers/logger";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendVerificationEmail(email: string){
	try {
 		const info = await transporter.sendMail({
			from: '"No Reply" <no-reply@example.com>', // sender address
			to: email, // list of recipients
    		subject: "Welcome to the Circus", // subject line
    		text: "This is a verification email in plain text", // plain text body
    		html: "<b>This is a verificaiton email in HTML</b>", // HTML body
  		});

  		logger.info("Message sent: %s", info.messageId);
  		// Preview URL is only available when using an Ethereal test account
  		logger.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	} catch (err) {
  		logger.error("Error while sending mail:", err);
	}
}