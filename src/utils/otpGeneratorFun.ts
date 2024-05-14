import speakeasy from 'speakeasy'

export const generateOtp = ():string=>{
    const otp = speakeasy.totp({
        secret: speakeasy.generateSecret({ length: 20 }).base32,
        digits: 4,
    });
    return otp
}