import express from 'express'
import { get, merge} from 'lodash'

import { getUsersBySeasonToken } from '../schemas/users.schema'


export const isOwner= async (req: express.Request, res: express.Response, next: express.NextFunction  ) =>{
 try {
    const { id } = req.params

    const currentUserId = get(req, 'identity.:id') as string

      if(!currentUserId){
        return res.sendStatus(403)
    }

      if(currentUserId.toString() !== id){
        return res.sendStatus(403)
    }

    next()
     } catch (error) {
    console.log(error)
    return res.sendStatus(400) 
 }
}

export const isAuithenticated = async (req: express.Request, res: express.Response, next: express.NextFunction ) =>{
 try {

    const sessionToken = req.cookies['JHORK-AUTH']

    if(!sessionToken){
        return res.sendStatus(403)
    }

    const existinuser = await getUsersBySeasonToken(sessionToken    )

    if(!existinuser){
        return res.sendStatus(403)
    }

    merge(req, { identity: existinuser})

    return next()
 } catch (error) {
    console.log(error)
    return res.sendStatus(400) 
 }
}