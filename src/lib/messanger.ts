import amqp = require('amqplib/callback_api');


export function sendMessage(name: "PaymentMessage", message: PaymentMessage) {
    let conn: amqp.Connection;
    return new Promise((resolve, reject) => {
        amqp.connect('amqp://localhost', function (error0, connection) {
            if (error0) {
                return reject(error0);
            }

            conn = connection;
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    return reject(error1);
                }

                var exchange = name;//'PaymentMessage';
                channel.assertExchange(exchange, 'topic', { durable: false });
                channel.assertQueue(exchange, { durable: false }, function (error2, q) {
                    if (error2) {
                        throw error2;
                    }

                    let msg = JSON.stringify(message);
                    channel.publish(exchange, 'shop-cloud', Buffer.from(msg));
                    console.log(`${exchange}: [x] Sent %s`, msg);

                    resolve();
                });
            });


        });
    }).finally(() => {
        if (conn) {
            //=========================================
            setTimeout(() => {
                conn.close();
            }, 300)
            //=========================================
        }
    })
}

// amqp.connect('amqp://localhost', function (error0, connection) {
//     if (error0) {
//         throw error0;
//     }
//     connection.createChannel(function (error1, channel) {
//         if (error1) {
//             throw error1;
//         }

//         var exchange = 'PaymentMessage';
//         channel.assertExchange(exchange, 'topic', { durable: false });
//         channel.assertQueue(exchange, { durable: false }, function (error2, q) {
//             if (error2) {
//                 throw error2;
//             }

//             let msg = "hello world";
//             channel.publish(exchange, '', Buffer.from(msg));
//             console.log(" [x] Sent %s", msg);


//         });
//     });


// });

// (async () => {
//     let connection = await connect('amqp://localhost');
//     try {
//         let channel = await createChannel(connection);
//         await assertQueue(channel, exchange, { durable: false });

//         var exchange = 'PaymentMessage';
//         let msg: PaymentMessage = {
//             PaymentType: "WeiXin",

//         }
//         channel.publish(exchange, "", Buffer.from(""));
//     }
//     finally {
//         connection.close();
//     }

// })();

export interface PaymentMessage {
    /** 支付类型 */
    PaymentType: "WeiXin" | "Balance" | "Cash" | "Manual",

    /** 金额 */
    Amount: number,

    /** 订单编号 */
    TargetId: string,

    /** 支付单号 */
    PaymentId: string,

    /** 用户编号 */
    UserId: string,

    ApplicationId: string,
}