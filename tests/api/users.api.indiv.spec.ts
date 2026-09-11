import { test, expect } from '../../src/fixtures/apifixtures';
import { APIUtils } from '../../src/utils/APIUtils';

const TOKEN = process.env.API_TOKEN!;
const AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };
let userId: number;

//helper - generic function - create a fresh user
async function createUser(apiUtils: any) {

    const userData = {
        name: 'Khushi',
        email: `automation_${Date.now()}@open.com`,
        gender: 'female',
        status: 'active'
    };

    let response = await apiUtils.post('public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);

    return await response.body;

}

// Test 1: Create a user + verify: AA
//POST ----> userId ----> GET/userId --- Verify
test('POST - create a user', async ({ apiUtils }) => {

    //create a user:
    let userResponse = await createUser(apiUtils);

    //get the user:
    let response = await apiUtils.get(`public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(userResponse.name);
    expect(userResponse).toEqual(response.body);
})


// Test 2: Update a user + verify: AA
//POST ----> userId ----> PUT--> GET/userId --- Verify
test('PUT - update a user', async ({ apiUtils }) => {

    //create a user:
    let userResponse = await createUser(apiUtils);

    const userUpdatedData = {
        name: 'Khushi test updated',
        status: 'inactive'
    };



    //Update the user:
    let response = await apiUtils.put(`public/v2/users/${userResponse.id}`, userUpdatedData, AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(userUpdatedData.name);
    expect(response.body.status).toBe(userUpdatedData.status);


    //get the user:
    let getresponse = await apiUtils.get(`public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getresponse.status).toBe(200);
    expect(getresponse.body.name).toBe(userUpdatedData.name);
    expect(getresponse.body.status).toBe(userUpdatedData.status);


})


// Test 3: Delete a user + verify: AAA
//POST ----> userId ----> DELETE(204)--> GET/userId --- Verify(404)
test('DELETE - delete a user', async ({ apiUtils }) => {

    //create a user:
    let userResponse = await createUser(apiUtils);



    //Delete the user:
    let response = await apiUtils.delete(`public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(response.status).toBe(204);


    //get the user:
    let getresponse = await apiUtils.get(`public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getresponse.status).toBe(404);
    expect(getresponse.body.message).toBe('Resource not found');

})

///Assignment- https://restful-booker.herokuapp.com/apidoc/index.html - Automate this