import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const teamSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const activitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const leaderboardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, default: 0 },
});

const workoutSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  level: { type: String, default: 'beginner' },
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);