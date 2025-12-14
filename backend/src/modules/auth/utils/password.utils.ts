import bcrypt from 'bcrypt'; // or require('bcrypt')

export const hashPassword = async (plainTextPassword) => {
  try {
    const saltRounds = 10; // A cost factor between 10-12 is generally recommended
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    return hashedPassword; // Store this hash in your database
  } catch (error) {
    throw new Error('Failed to hash password');
  }
};

export const comparePassword = async (plainTextPassword, passwordHash) => {
  try {
    const isMatch = await bcrypt.compare(plainTextPassword, passwordHash);
    return isMatch; // Returns true if passwords match, false otherwise
  } catch (error) {
    throw new Error('Failed to compare passwords');
  }
};
