import express from 'express'
import { body } from 'express-validator'
import {UserController} from '../../controllers'

const router = express.Router()

router.route('/login')
    .post( 
        [
            body("email").isEmail().withMessage("Email must be valid"),
            body("password")
                .trim()
                .isLength({ min: 4, max: 20 })
                .withMessage("Password must be between 4 and 20 characters"),
        ],        
        UserController.login
    )
router.route('/signup')
    .post( 
        [
            body("email").isEmail().withMessage("Email must be valid"),
            body("password")
                .trim()
                .isLength({ min: 4, max: 20 })
                .withMessage("Password must be between 4 and 20 characters"),
        ],        
        UserController.signup
    )


export default router