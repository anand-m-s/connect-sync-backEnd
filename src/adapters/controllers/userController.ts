// import asyncHandler from 'express-async-handler'
// import { Request,Response } from 'express'
// import { userDbInterface } from '../../app/repositories/userDbRepository.js'
// import { UserRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/userRepoMongoDb.js'
// import { userRegister } from '../../app/usecases/users/user.js'
// import { userRegisterInterface } from '../../types/userRegisterInterface.js'

// const userController = (

//     userDbRepository : userDbInterface,
//     userDbRepositoryImpl:UserRepositoryMongoDB

// )=>{
//     const dbRepositoryUser = userDbRepository(userDbRepositoryImpl())


//     //Register User
//     const registerUser = asyncHandler(async(req:Request, res:Response)=>{
//         const user :userRegisterInterface = req.body
//         await userRegister(user,dbRepositoryUser);
//         res.status(200).json({
//             status:'success',
//             message:'user registerd successfully'
//         })
//     })

//     return{
//         registerUser
//     }
// }


// export default userController



