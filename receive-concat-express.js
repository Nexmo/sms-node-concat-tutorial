require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app
    .route('/webhooks/inbound-sms')
    .get(handleInboundSms)
    .post(handleInboundSms);

let concat_sms = []; // Array of message objects

function handleInboundSms(request, response) {
    const params = Object.assign(request.query, request.body);

    if (params['concat'] === 'true') {
        /* This is a concatenated message. Add it to an array
           so that we can process it later. */
        concat_sms.push({
            ref: params['concat-ref'],
            part: params['concat-part'],
            from: params.msisdn,
            message: params.text
        });

        /* Do we have all the message parts yet? They might
           not arrive consecutively. */
        let parts_for_ref = concat_sms.filter(function (part) {
            return part.ref == params['concat-ref'];
        });

        // Is this the last message part for this reference?
        if (parts_for_ref.length == params['concat-total']) {
            console.dir(parts_for_ref);
            processConcatSMS(parts_for_ref);
        }
    } else {
        // Not a concatenated message, so just display it
        displaySMS(params.msisdn, params.text);
    }

    // Send OK status
    response.status(204).send();
}

function processConcatSMS(all_parts) {

    // Order all the message parts
    all_parts.sort(function (a, b) {
        if (Number(a.part) < Number(b.part)) {
            return -1;
        } else {
            return 1;
        }
    })

    let concat_message = '';

    // Reassemble the message from the parts
    for (i = 0; i < all_parts.length; i++) {
        concat_message += all_parts[i].message;
    }

    displaySMS(all_parts[0].from, concat_message);
}

function displaySMS(msisdn, text) {
    console.log('FROM: ' + msisdn);
    console.log('MESSAGE: ' + text);
    console.log('---');
}

app.listen(process.env.PORT);
