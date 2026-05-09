import mongoose from 'mongoose';

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const User = mongoose.connection.collection('users');
  
  // Create a Farm user
  await User.updateOne(
    { email: 'farm@vetera.com' },
    { $set: {
        role: 'Farm',
        fullName: 'Vetera Sunrise Farm',
        email: 'farm@vetera.com',
        phone: '9876543210',
        password: 'password123',
        isApproved: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    },
    { upsert: true }
  );
  
  console.log("Farm user created successfully.");
  process.exit(0);
}

seed();
