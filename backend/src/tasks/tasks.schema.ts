import { Schema, Document } from 'mongoose';

export const TaskSchema = new Schema({
  content: String,
  done: Boolean,
});

export interface Task extends Document {
  content: string;
  done: boolean;
}
