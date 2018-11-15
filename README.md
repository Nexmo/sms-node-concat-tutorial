# SMS API Concatenation Tutorial

This app demonstrates how to concatenate long text messages using the SMS API.

## Prerequisites

You will need:

* A [free Nexmo account](https://dashboard.nexmo.com/sign-up)

## Installation

```sh
git clone https://github.com/Nexmo/sms-node-concat-tutorial.git
cd sms-node-concat-tutorial
npm install
```

## Setup

Rename the config file:

```sh
mv .env-example .env
```

Fill in the values in `.env` as appropriate.

### Running the App

Run the following command in the application directory:

```sh
npm start
```
The application should be running on the port you specified in `.env`.

Configure the webhook URL (`https://example.com/webhooks/inbound-sms`) in your [Dashboard Settings](https://dashboard.nexmo.com/settings/). If you are using `ngrok`, this will be in the form:

```
https://demo.ngrok.io/webhooks/inbound-sms
```

### Using the App

Send a long (> 160 standard GSM characters) text message to the number you specified in the `TO_NUMBER` setting in your `.env` file.

The console output of `server.js` should show the invididual message parts and then the complete message once all the parts have been received and reassembled.

## License

The content of this project itself is licensed under the [Creative Commons Attribution 4.0 International license](https://creativecommons.org/licenses/by/4.0/), and the underlying source code used to format and display that content is licensed under the [MIT license](https://www.nexmo.com/blog/2017/07/04/local-development-nexmo-ngrok-tunnel-dr/).
	

