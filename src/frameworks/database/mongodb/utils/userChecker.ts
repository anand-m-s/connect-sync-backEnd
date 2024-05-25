import User from "../models/user";


export const checkExistingUser = async (email:string,userName:string) => {
    const existingUser = await User.findOne({ $or: [{ email: email }, { userName:userName }] })
    return existingUser
}


export const checkUserName = async(userName:string,id:string)=>{
    console.log('inside checkUsername')
    const existingUser = await User.find({$or:[{_id:id},{userName:userName}]})
    console.log(existingUser!)
   if(existingUser.length==1){
    return existingUser[0]
   }else{
    throw new Error('Another user has the same username try another!')
   }
}
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