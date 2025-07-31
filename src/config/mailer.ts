require("dotenv").config()
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
})

export class Mailer {
	static createMessageObject(
		emailToBeSendedTo: string,
		subject: string,
		messageText: string
	) {
		const messageObject = {
			from: process.env.GMAIL_USER,
			to: emailToBeSendedTo,
			subject: subject,
			text: messageText,
		};

		return messageObject;
	}

	public static sendEmail(
		emailToBeSendedTo: string,
		subject: string,
		messageText: string
	) {

		const messageObject = Mailer.createMessageObject(
			emailToBeSendedTo,
			subject,
			messageText
		);

		transporter.sendMail(messageObject, (error: any) => {
			if (error != null) {
				throw error;
			}
		});
	}
}