import express from "express";
import { createUser, getUsersByEmail } from "schemas/users.schema";
import {random, authentication } from '../helpers'

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body

        if( !email || !password || !username  ) return res.status(400)

            const existinuser = await getUsersByEmail(email)
            if(existinuser) {return res.status(400).send('Correo ya registrado')  } 

            const salt = random()

            const user = await createUser({
                email,
                username,
                authentication:{
                    salt,
                    password: authentication(salt, password)
                }
            })

            return res.status(200).json(user).end()


    } catch (error) {
        console.log(error)
        return res.status(400)
    }
}