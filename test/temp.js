var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var exchange = 'PaymentMessage';

        channel.assertExchange(exchange, 'topic', { durable: false });

        channel.assertQueue(exchange, {
            durable: false
        }, function(error2, q) {
            if (error2) {
                throw error2;
            }
            // console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            // channel.bindQueue(q.queue, exchange, '');

            // channel.consume(q.queue, function (msg) {
            //     if (msg.content) {
            //         console.log(" [x] %s", msg.content.toString());
            //     }
            // }, {
            //     noAck: true
            // });

            let msg = "hello world";
            channel.publish(exchange, 'shop-cloud', Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
            // connection.close();
        });
    });



});