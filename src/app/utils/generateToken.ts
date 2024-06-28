import jwt from 'jsonwebtoken'

export const generateToken = (userId: string,role:string) => {
    const token = jwt.sign({ userId,role }, process.env.JWT_SECRET!, {
        expiresIn: '30d',
    });

    return token;
}
