import request from "supertest"
import { app } from "../../../app"

it(" respond with the current logged in user", async() => {

    const cookie = await global.loginCookie()

    const currentUser = await request(app)
                                .get('/api/users/currentUser')
                                .set('Cookie', cookie || [])
                                .send()
                                .expect(200)
    expect(currentUser.body.data.email).toEqual("dhairya@yahoo.com")
})


it(" respond with the null when not logged in", async() => {

    const currentUser = await request(app)
                                .get('/api/users/currentUser')
                                .send()
                                .expect(200)
                                
    expect(currentUser.body.data).toEqual(null)
})