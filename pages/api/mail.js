import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const {
    body: { name, email, message },
    method,
  } = req;

  switch (method) {
    case 'POST':
      try {
        await sendgrid.send({
          to: 'ember.navarro@gmail.com',
          from: 'ember@craftedorigin.com',
          reply_to: { email, name },
          subject: 'Contact from EmberNavarro.com',
          text: message,
        });
      } catch (error) {
        console.log(`error`, error);
        return res.status(error.statusCode || 500).json({
          message: 'Something went wrong, please send an email instead.',
          error: error.message,
        });
      }
      return res
        .status(200)
        .json({ message: 'Message sent! I will reply back ASAP.', error: '' });
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
