// lib/twilio.ts
import twilio from 'twilio';

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

let _twilioClient: ReturnType<typeof twilio> | null = null;

function getTwilioClient(): ReturnType<typeof twilio> | null {
  if (_twilioClient) return _twilioClient;
  if (!twilioAccountSid?.startsWith('AC') || !twilioAuthToken) return null;
  _twilioClient = twilio(twilioAccountSid, twilioAuthToken);
  return _twilioClient;
}

export { getTwilioClient as twilioClient };

export async function initiateCall(toNumber: string, fromNumber: string = twilioPhoneNumber!) {
  const client = getTwilioClient();
  if (!client) throw new Error('Twilio not configured');
  try {
    const call = await client.calls.create({
      from: fromNumber,
      to: toNumber,
      url: `${process.env.NEXTAUTH_URL}/api/twilio/twiml`,
    });
    return call;
  } catch (error) {
    console.error('Twilio call initiation error:', error);
    throw error;
  }
}

export async function sendSMS(toNumber: string, message: string) {
  const client = getTwilioClient();
  if (!client) throw new Error('Twilio not configured');
  try {
    const sms = await client.messages.create({
      from: twilioPhoneNumber!,
      to: toNumber,
      body: message,
    });
    return sms;
  } catch (error) {
    console.error('Twilio SMS error:', error);
    throw error;
  }
}

export async function getCallRecording(callSid: string) {
  const client = getTwilioClient();
  if (!client) return null;
  try {
    const recordings = await client.calls(callSid).recordings.list({ limit: 1 });
    if (recordings.length > 0) {
      return recordings[0];
    }
    return null;
  } catch (error) {
    console.error('Twilio recording fetch error:', error);
    return null;
  }
}

export function generateTwiML(message: string = 'Call connected') {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Say voice="alice">${message}</Say>
    </Response>`;
}
