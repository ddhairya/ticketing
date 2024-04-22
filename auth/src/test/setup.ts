import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { ConnectOptions } from 'mongoose';
import { app } from '../app';
import request from 'supertest';

let mongo: MongoMemoryServer;

beforeAll(async () => {
    process.env.JWT_KEY = 'test';

    mongo = await MongoMemoryServer.create();
    const mongodbURI = await mongo.getUri();

    const mongooseOptions: ConnectOptions = {};

    try {
        await mongoose.connect(mongodbURI);
    } catch (e) {
        console.log(e);
    }
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.loginCookie = async () => {
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

    return cookie || [];
};
