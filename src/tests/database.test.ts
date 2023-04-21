import { describe, expect, test } from '@jest/globals';
import { RTCreateUser, RTDeleteUser, RTGetUser } from '../controllers/firebase_realtime_database';
import UserModel from '../models/user_model';
import { EmailAlreadyExistsError } from '../errors/EmailAlreadyExistsError';
import { GetUserData } from '../controllers/firebase_controller';





describe('Realtime Database teste', () => {

    let userTest = new UserModel(
        {
            email: 'email@gmail.com',
            name: 'teste',
            UID: '',
            role: 'teste',
            team: 'teste',
        }
    )

    test('Get user',async () => {
        const data = await GetUserData('0');
        expect(data).toBeDefined();
    })
    



    describe('Creating and deleting user in Realtime Database', () => {
        let code = 0;
        let message = '';


        afterAll(async () => {
            console.log('deletando');
            await RTDeleteUser(message[1]);
        })
    
        test("Creating user", async () => {
            const data = await RTCreateUser(userTest);
            code = data.code;
            message = data.message;

            expect(code).toBe(201);
        })

        test('Compiling to verify exception of Email exists', async () => {

            return expect(RTCreateUser(userTest)).rejects.toThrowError(EmailAlreadyExistsError);

        })
        
    })
})


