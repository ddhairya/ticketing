import request from 'supertest'
import { app } from '../app'

export const loginCookie = async() => {
    const email = "dhairya@yahoo.com";
    const password = "123456789";

    const loginResponse = await request(app)
        .post('/api/users/signup')
        .send({
            email,
            password,
        })
        .expect(201);

    const cookie = loginResponse.get('Set-Cookie');

    return cookie;
}