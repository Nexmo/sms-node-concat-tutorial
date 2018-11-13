require('dotenv').config();

const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET
})

const from = 'TEST-NEXMO';
const to = process.env.TO_NUMBER;
const text = 'This is a short text message.';

nexmo.message.sendSms(from, to, text);
