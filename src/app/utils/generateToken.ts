import jwt from 'jsonwebtoken'

export const generateToken = (userId: string,role:string) => {
    const token = jwt.sign({ userId,role }, process.env.JWT_SECRET!, {
        expiresIn: '1m',
    });
    const refreshToken = jwt.sign({ userId, role }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: '7d',
    });

    return {token,refreshToken};
}
