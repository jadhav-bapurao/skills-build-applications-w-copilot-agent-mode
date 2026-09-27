import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    const sampleUsers = [
      { username: 'maya.chen', email: 'maya.chen@example.com', password: 'octofit-demo' },
      { username: 'jordan.lee', email: 'jordan.lee@example.com', password: 'octofit-demo' },
      { username: 'sam.rivera', email: 'sam.rivera@example.com', password: 'octofit-demo' },
      { username: 'taylor.kim', email: 'taylor.kim@example.com', password: 'octofit-demo' },
    ];

    const users = await Promise.all(
      sampleUsers.map((user) =>
        User.findOneAndUpdate({ username: user.username }, { $set: user }, {
          upsert: true,
          new: true,
          runValidators: true,
        }),
      ),
    );
    const usersByName = new Map(users.map((user) => [user.username, user]));

    const sampleTeams = [
      { name: 'Summit Striders', members: ['maya.chen', 'jordan.lee', 'sam.rivera'] },
      { name: 'City Cycle Club', members: ['jordan.lee', 'taylor.kim'] },
    ];

    await Promise.all(
      sampleTeams.map((team) =>
        Team.findOneAndUpdate(
          { name: team.name },
          { $set: { members: team.members.map((username) => usersByName.get(username)?._id) } },
          { upsert: true, new: true, runValidators: true },
        ),
      ),
    );

    const sampleActivities = [
      { username: 'maya.chen', type: 'running', duration: 32, date: new Date('2026-09-20T08:00:00Z') },
      { username: 'jordan.lee', type: 'cycling', duration: 48, date: new Date('2026-09-21T07:30:00Z') },
      { username: 'sam.rivera', type: 'strength training', duration: 40, date: new Date('2026-09-22T17:00:00Z') },
      { username: 'taylor.kim', type: 'yoga', duration: 35, date: new Date('2026-09-23T18:00:00Z') },
    ];

    await Promise.all(
      sampleActivities.map((activity) => {
        const user = usersByName.get(activity.username);
        if (!user) throw new Error(`Seed user not found: ${activity.username}`);

        return Activity.findOneAndUpdate(
          { user: user._id, type: activity.type, date: activity.date },
          { $set: { user: user._id, type: activity.type, duration: activity.duration, date: activity.date } },
          { upsert: true, new: true, runValidators: true },
        );
      }),
    );

    await Promise.all(
      users.map((user, index) =>
        Leaderboard.findOneAndUpdate(
          { user: user._id },
          { $set: { user: user._id, points: [460, 390, 325, 280][index] } },
          { upsert: true, new: true, runValidators: true },
        ),
      ),
    );

    const sampleWorkouts = [
      { name: 'Starter 5K Run', description: 'A steady-paced run for building aerobic fitness.', level: 'beginner' },
      { name: 'Hill Repeats', description: 'Short uphill efforts with an easy recovery jog.', level: 'intermediate' },
      { name: 'Full Body Strength', description: 'A balanced strength session using compound movements.', level: 'beginner' },
      { name: 'Mobility Reset', description: 'A gentle sequence for hips, shoulders, and back.', level: 'all levels' },
    ];

    await Promise.all(
      sampleWorkouts.map((workout) =>
        Workout.findOneAndUpdate({ name: workout.name }, { $set: workout }, {
          upsert: true,
          new: true,
          runValidators: true,
        }),
      ),
    );

    console.log('Database seeding complete: 4 users, 2 teams, 4 activities, 4 leaderboard entries, and 4 workouts.');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
