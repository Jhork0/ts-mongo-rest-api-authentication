import express from "express";
import { createUser, getUsersByEmail } from "../schemas/users.schema";
import {random, authentication } from '../helpers'


export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const user = await getUsersByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(400).send("Correo no registrado");
    }

    const expectedHash = authentication(user.authentication.salt, password) // 🔥 Convert to string!
    
    if (user.authentication.password !== expectedHash) {
      return res.status(403).send("Contraseña incorrecta");
    }

    const salt = random();
    const sessionToken = authentication(salt, user._id.toString()); 

    user.authentication.sessionToken = sessionToken;
    await user.save();

    return res
      .status(200)
      .cookie("JHORK-AUTH", sessionToken, {
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
      })
      .json({ success: true, message: "Login successful" });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send("Internal server error");
  }
};

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