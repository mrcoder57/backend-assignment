import cron from 'node-cron';
import { connect } from "../utils/connect.js";
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import twilio from 'twilio';

const accountSid = 'your-twilio-account-sid';
const authToken = 'your-twilio-auth-token';
const twilioClient = twilio(accountSid, authToken);

cron.schedule('0 0 * * *', async () => {
 try {
    const users = await User.find().sort({ priority: 1 });

    for (const user of users) {
      const tasks = await getTasksForUser(user._id);

      for (const task of tasks) {
        if (task.due_date < new Date() && task.status !== 'DONE') {
          await initiateVoiceCall(user.phone_number);

          console.log(`Voice call initiated to user with priority ${user.priority}`);
          break; 
        }
      }
    }

    console.log('Voice Calling Cron Job executed successfully');
 } catch (error) {
    console.error('Error executing Voice Calling Cron Job:', error);
 }
});

async function initiateVoiceCall(phoneNumber) {
 
 twilioClient.calls.create({
    url: 'http://demo.twilio.com/docs/voice.xml',
    to: phoneNumber,
    from: '+12345678901' 
 }).then(call => console.log(call.sid));
}
connect()