import cron from 'node-cron';
import { connect } from "../utils/connect.js";
import mongoose from 'mongoose';
import Task from '../models/task.model.js';
cron.schedule('0 0 * * *', async () => {
    try {
      await Task.updateMany(
        { due_date: { $lt: new Date().setHours(24, 0, 0, 0) } },
        { $set: { priority: 0 } }
      );
  
     
      await Task.updateMany(
        {
          due_date: {
            $gte: new Date().setHours(24, 0, 0, 0),
            $lt: new Date().setHours(48, 0, 0, 0),
          },
        },
        { $set: { priority: 1 } }
      );
  
      console.log('Priority Cron Job executed successfully');
    } catch (error) {
      console.error('Error executing Priority Cron Job:', error);
    }
  });
  connect();