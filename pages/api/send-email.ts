    import { NextApiRequest, NextApiResponse } from 'next';
    import { transporter, mailOptions } from '../../lib/nodemailer';

    const handler = async (req: NextApiRequest, res: NextApiResponse) => {
        if (req.method === 'POST') {
            const data = req.body;
            if (!data) {
                return res.status(400).json({ message: 'Bad request' });
            }
            try {
                await transporter.sendMail({
                    ...mailOptions,
                    subject: 'Message from your website',
                    text: data.message,
                    html: `<h1>Message from ${data.name}</h1><p>${data.message}</p>`,
                });
                return res.status(200).json({ success: true });
            } catch (error) {
                console.error(error);
                return res.status(400).json({ message: 'Failed to send email' });
            }
        }
        return res.status(400).json({ message: 'Bad request' });
    };

    export default handler;