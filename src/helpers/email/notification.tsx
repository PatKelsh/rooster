import nodemailer from "nodemailer";
import { getUserById } from "@/lib/prisma/user";
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

// Send a notification email to set of users based on an array of user IDs. The subject line and text of the email message also need to be provided provided
export async function sendNotificationEmail(users: Array<string>, subjectLine: string, emailText: string){
	try {
		for (const user of users) {
			const userInfo = await getUserById(user);
			if (!userInfo) {
				logger.info('No user ID found for user %s', user);
				continue;
			}
			const info = await transporter.sendMail({
				from: '"No Reply" <no-reply@rooster.com>',
				to: userInfo.email,
				subject: subjectLine,
				html: emailText
			});

		logger.info("Message sent: %s", info.messageId);
		}
	} catch (err) {
		logger.error('Error while sending mail:', err);
		throw err
	};
}