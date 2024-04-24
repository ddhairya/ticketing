import { useState } from "react"
import Router from "next/router"
import userRequest from "../../hooks/user-request"

export default () =>{
    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
    const { doRequest , errors} = userRequest({ 
        url: '/api/users/signup',
        method: 'post',
        body: { email, password },
        onSuccess: () => Router.push('/')
    })

    const onSubmit= async (event) => {
        event.preventDefault()

        doRequest()
    }
    return(
        <form onSubmit={ onSubmit}>
            <div className="form-group">
                <label>Email</label>
                <input 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="form-control"/>
            </div>
            <div  className="form-group">
                <label> Password </label>
                <input 
                    value={password} 
                    onChange={ e => setPassword(e.target.value)}
                    type="password" 
                    className="form-control"/>
            </div>
            {
                errors
            }
            <button className="btn btn-primary">Sign Up</button>
        </form>
    )
}