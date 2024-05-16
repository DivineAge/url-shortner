import bcrypt  from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error occurred during password hashing:', error);
        throw error; 
    }
}

export const comparePassword = async (plain, hashed) => {
    return await bcrypt.compare(plain,hashed)
}