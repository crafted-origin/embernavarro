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
          to: 'wayne.huang14@gmail.com',
          from: 'wayne.huang14@gmail.com',
          reply_to: { email, name },
          subject: 'Contact from EmberNavarro.com',
          text: message,
        });
      } catch (error) {
        return res
          .status(error.statusCode || 500)
          .json({ error: error.message });
      }
      return res.status(200).json({ error: '' });
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
