const amqp = require('amqplib/callback_api');
const recordClick = require('./recordClick');

const pushClickToQueue = (clickData) => {
  amqp.connect(process.env.RABBIT_URL, (err, conn) => {
    if (err) {
      console.log(err);
      return;
    }
    conn.createChannel((error, channel) => {
      const q = 'recordClick';
      channel.assertQueue(q, { durable: false });
      console.log(clickData);
      channel.sendToQueue(q, Buffer.from(JSON.stringify(clickData)));
      console.log('Data Sent');
    });
    setTimeout(() => { conn.close(); }, 1000);
  });
};

amqp.connect(process.env.RABBIT_URL, (err, conn) => {
  conn.createChannel((error, channel) => {
    const q = 'recordClick';
    channel.assertQueue(q, { durable: false });
    console.log('Waiting for a click...');
    channel.consume(q, (clickData) => {
      recordClick(JSON.parse(clickData.content.toString()));
    }, { noAck: true });
  });
});

module.exports = pushClickToQueue;
