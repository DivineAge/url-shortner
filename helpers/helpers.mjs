import bcrypt  from 'bcrypt';

const saltRounds = 10;

export const hashPassword =  (password) => {
    try {
        const salt =  bcrypt.genSaltSync(saltRounds);
        const hashedPassword =  bcrypt.hashSync(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error occurred during password hashing:', error);
        throw error; 
    }
}

export const comparePassword =  (plain, hashed) => {
    return  bcrypt.compareSync(plain,hashed)
}