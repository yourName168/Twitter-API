import { Router } from 'express'
import { wrap } from '~/utils/handlers'
import { uploadSingleImageController } from '~/controllers/medias.controllers'
const mediasRouter = Router()

mediasRouter.post('/upload-image', wrap(uploadSingleImageController))
export default mediasRouter
