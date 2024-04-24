import axios from "axios"
import buildClient from "../api/build-client"

const LandingPage = (currentUser) => {
    return currentUser.data ? (<h1> You are signed in</h1>) : (<h1>Please Sign in to use the app</h1>)
}

LandingPage.getInitialProps = async (context) => {
    const client = await buildClient(context)
    const response = await client.get('/api/users/currentUser')

    return response.data

}

export default LandingPage