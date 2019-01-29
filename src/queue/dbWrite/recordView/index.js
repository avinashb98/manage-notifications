const amqp = require('amqplib/callback_api');
const recordView = require('./recordView');

const pushClickToQueue = (viewData) => {
  amqp.connect(process.env.RABBIT_URL, (err, conn) => {
    if (err) {
      console.log(err);
      return;
    }
    conn.createChannel((error, channel) => {
      const q = 'recordView';
      channel.assertQueue(q, { durable: false });
      channel.sendToQueue(q, Buffer.from(JSON.stringify(viewData)));
    });
    setTimeout(() => { conn.close(); }, 1000);
  });
};

amqp.connect(process.env.RABBIT_URL, (err, conn) => {
  conn.createChannel((error, channel) => {
    const q = 'recordView';
    channel.assertQueue(q, { durable: false });
    console.log('Waiting for a view...');
    channel.consume(q, (viewData) => {
      recordView(JSON.parse(viewData.content.toString()));
    }, { noAck: true });
  });
});

module.exports = pushClickToQueue;
