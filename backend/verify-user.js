const mongoose = require('mongoose');

const mongoUri = 'mongodb+srv://OMNIDOC:obaoba1234@cluster0.ws4dcfr.mongodb.net/?appName=Cluster0';

mongoose.connect(mongoUri).then(async () => {
  const userSchema = new mongoose.Schema({
    email: String,
    emailVerified: Boolean,
  });
  
  const User = mongoose.model('User', userSchema, 'users');
  
  const result = await User.updateOne(
    { email: 'testimonyojo86@gmail.com' },
    { $set: { emailVerified: true } }
  );
  
  console.log('User updated:', result);
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
