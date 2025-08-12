import express from 'express'
import { getAllUserApp, deleteUser, UpdateUser } from '../controllers/users'
import { isAuithenticated, isOwner } from '../middlewares/index'

export default(router: express.Router) => {
    router.get('/users', isAuithenticated, getAllUserApp)
    router.delete('/users/:id', isOwner, deleteUser)
    router.put('/users/:id', isOwner, UpdateUser)
}