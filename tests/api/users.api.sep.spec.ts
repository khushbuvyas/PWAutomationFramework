import { test, expect } from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_TOKEN!;
const AUTH_TOKEN = { Authorization: `Bearer ${TOKEN}` };
let userId: number;


// test.describe for grouping multiple testcases together and .seiral is for execution in sequece as written
test.describe.serial('Running e2e gorest crud api tests', () => {

    // GET test:
    test('GET API -- get all users', async ({ apiUtils }) => {
        let response = await apiUtils.get('public/v2/users', AUTH_TOKEN);
        expect(response.status).toBe(200);
        expect(await response.body.length).toBeGreaterThan(0);
    })

    //POST
    test('POST API -- create a user', async ({ apiUtils }) => {

        const userData = {
            name: 'Pavi',
            email: `automation_${Date.now()}@open.com`,
            gender: 'female',
            status: 'active'
        };

        let response = await apiUtils.post('public/v2/users', userData, AUTH_TOKEN);
        expect(response.status).toBe(201);

        // Getting data from the response
        expect(await response.body.name).toBe(userData.name);
        expect(await response.body.id).not.toBeNull();
        userId = await response.body.id;
        console.log('Created Used Id: ', userId);
    })

    //PUT
    test('PUT API -- Update a user', async ({ apiUtils }) => {

        const userUpdatedData = {
            name: 'Pavi test updated',
            status: 'inactive'
        };

        let response = await apiUtils.put(`public/v2/users/${userId}`, userUpdatedData, AUTH_TOKEN);
        expect(response.status).toBe(200);

        // Getting data from the response
        expect(await response.body.name).toBe(userUpdatedData.name);
        expect(await response.body.status).toBe(userUpdatedData.status);

    })
    // DELETE
    test('DELETE API -- Delete a user', async ({ apiUtils }) => {

        let response = await apiUtils.delete(`public/v2/users/${userId}`, AUTH_TOKEN);
        expect(response.status).toBe(204);

    })
})
