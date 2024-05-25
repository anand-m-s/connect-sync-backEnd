export interface SessionManager {
    setOtp(otp:string):void;
    setOtpGeneratedTime(time:number):void;
}