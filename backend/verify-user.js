require('dotenv').config();
const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL;

if (!mongoUri) {
  console.error('Error: MONGODB_URI or DATABASE_URL environment variable is not defined.');
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Define schema locally to avoid import issues if not using TS
    const userSchema = new mongoose.Schema({
      email: String,
      emailVerified: Boolean,
    }, { strict: false }); // strict: false allows us to update fields even if not in this partial schema
    
    // Use the existing 'users' collection
    const User = mongoose.model('User', userSchema, 'users');
    
    const emailToVerify = process.argv[2] || 'testimonyojo86@gmail.com';
    console.log(`Attempting to verify user: ${emailToVerify}`);

    const result = await User.updateOne(
      { email: emailToVerify },
      { $set: { emailVerified: true } }
    );
    
    if (result.matchedCount === 0) {
      console.log('User not found.');
      process.exit(1);
    }

    console.log('User verified successfully:', result);
    process.exit(0);
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

