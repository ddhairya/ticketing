import express from 'express'
import {UserController} from '../../controllers'
import { loginValidation, singupValidation } from '../../middleware/userInputValidation.middleware' 
import { userInputErrorValidation } from '../../middleware/userInputErrorValidation.middleware'
import { currentUser } from '../../middleware/currentUser.middleware'
import { AuthenticationCheck } from '../../middleware/authenticationCheck.middleware'

const router = express.Router()

router.route('/login')
    .post( 
        loginValidation,    
        userInputErrorValidation,    
        UserController.login
    )
router.route('/signup')
    .post( 
        singupValidation,  
        userInputErrorValidation,      
        UserController.signup
    )
router.route('/currentUser')
    .get(      
        currentUser,
        // AuthenticationCheck,
        UserController.currentUser
    )
router.route('/logout')
    .post(      
        UserController.signOut
    )


export default router