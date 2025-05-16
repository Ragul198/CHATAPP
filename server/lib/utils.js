import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ id: userId }, secretKey);
    return token;
};

