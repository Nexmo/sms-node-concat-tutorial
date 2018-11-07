const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app
    .route('/webhooks/inbound-sms')
    .get(handleInboundSms)
    .post(handleInboundSms)

let concat_sms = [] //array of message objects

function handleInboundSms(request, response) {
    const params = Object.assign(request.query, request.body)

    if (params['concat'] === 'true') {
        // This is a concatenated message. Add it to an array
        // so that we can process it later.
        concat_sms.push({
            ref: params['concat-ref'],
            part: params['concat-part'],
            from: params.msisdn,
            message: params.text
        });
        //console.dir(concat_sms)

        // Is this the last message part for this reference?
        if (params['concat-part'] == params['concat-total']) {
            processConcatSMS(params['concat-ref'])
        }
    } else {
        // Not a concatenated message, so   just display it
        displaySMS(params.msisdn, params.text)
    }

    // send OK status
    response.status(204).send()
}

function processConcatSMS(ref) {
    // get all SMS with this reference from our array
    let all_parts = concat_sms.filter(obj => obj.ref == ref)

    all_parts.sort(function(a, b) {
        if (Number(a.part) < Number(b.part)) {
            return -1;
        } else {
            return 1;
        }
    })
    
    //console.dir(all_parts)

    let concat_message = ''

    for(i=0; i < all_parts.length; i++) {
        concat_message += all_parts[i].message        
    }

    displaySMS(all_parts[0].from, concat_message)
}

function displaySMS(msisdn, text) {
    console.log('FROM: ' + msisdn)
    console.log('MESSAGE: ' + text)
    console.log('---')
}

app.listen(5000)
