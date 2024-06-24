"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserName = exports.checkExistingUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const checkExistingUser = (email, userName) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_1.default.findOne({ $or: [{ email: email }, { userName: userName }] });
    return existingUser;
});
exports.checkExistingUser = checkExistingUser;
const checkUserName = (userName, id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('inside checkUsername');
    const existingUser = yield user_1.default.find({ $or: [{ _id: id }, { userName: userName }] });
    console.log(existingUser);
    if (existingUser.length == 1) {
        return existingUser[0];
    }
    else {
        throw new Error('Another user has the same username try another!');
    }
});
exports.checkUserName = checkUserName;
// export const checkUserName = async(userName:string,id:string)=>{
//     const existingUser = await User.findOne({userName:userName})
//     console.log('inside checkUsername')
//     console.log(existingUser!)
//     if(!existingUser){
//         const user = await User.findById(id)
//         console.log(user)
//         return user
//     }   
//     if(existingUser && existingUser.id!==id){
//         console.log('inside error handling')
//         throw new Error('Another user has the same userName')
//     }
//     return existingUser
// }
