import express from 'express'
import { deleteUsersById, getUsers, getUsersById, updateUserById } from '../schemas/users.schema'

export const getAllUserApp = async ( req: express.Request, res: express.Response) => {
     try {
        const users = await getUsers()

        return res.status(200).json(users)
     } catch (error) {
        console.log(error)
        return res.sendStatus(400)
     }
}


export const deleteUser = async ( req: express.Request, res: express.Response) => {
     try {
      const { id } = req.params

        const FindeddeleteUser = await deleteUsersById(id)
         
         return res.status(200).json({ 
         success: true,
         message: "Usuario eliminado correctamente",
         FindeddeleteUser, 
    });
     } catch (error) {
        console.log(error)
        return res.sendStatus(400)
     }
}


export const UpdateUser = async ( req: express.Request, res: express.Response) => {
     try {
      const { id,  } = req.params
      const { username } = req.body

      if ( !username ) return res.sendStatus(400)

        const FindedUpdateUser = await getUsersById(id)
         
         FindedUpdateUser.username = username

         FindedUpdateUser.save()

         return res.status(200).json({ 
         success: true,
         message: "Usuario eliminado correctamente",
         FindedUpdateUser, 
    });
     } catch (error) {
        console.log(error)
        return res.sendStatus(400)
     }
}