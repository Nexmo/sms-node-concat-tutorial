const NEXMO_API_KEY = ''
const NEXMO_API_SECRET = ''
const TO_NUMBER = ''

const Nexmo = require('nexmo')

const nexmo = new Nexmo({
  apiKey: NEXMO_API_KEY,
  apiSecret: NEXMO_API_SECRET
})

const from = 'TEST-NEXMO'
const to = TO_NUMBER
const text = 'This is a short text'

nexmo.message.sendSms(from, to, text)
