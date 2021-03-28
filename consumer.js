const amqp = require('amqplib');

async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    await channel.assertQueue('jobs');

    channel.consume('jobs', message => {
      const input = JSON.parse(message.content.toString());
      console.log(`Recieved job with input ${input.number}`);
      channel.ack(message);
    });
  } catch (ex) {
    console.error(ex);
  }
}

connect();