import { test, expect } from '@playwright/test';


let AUTH_TOKEN = {Authorization : 'Bearer 4e74530924a1711a8f94298ad6d243cb050c04814ca2b79fc4030b02ecf6e11f'};

test('Get user test', async ({request}) => {

    let response = await request.get('https://gorest.co.in//public/v2/users', {
        headers: AUTH_TOKEN
    });

    //console.log(response);

    let jsonbody = await response.json();
    console.log(jsonbody);
    console.log(response.status()); // 200
    console.log(response.statusText()); // OK

    expect(response.status()).toBe(200);
})


test('Create user test', async ({request}) => {

    //JS Object
    const userData = {
        name: 'Pavi',
        email: `automation_${Date.now()}@open.com`,
        gender: 'female',
        status: 'active'
    };

    //JS Object to JSON: Auto Serialization
    let response = await request.post('https://gorest.co.in//public/v2/users', {
        headers: AUTH_TOKEN,
        data: userData
    });

    //console.log(response);

    let jsonbody = await response.json();
    console.log(jsonbody);
    console.log(response.status()); // 201
    console.log(response.statusText()); // created
})

test('Update user test', async ({request}) => {

    //JS Object
    const userData = {
        name: 'Pavi101',
        email: `automation_${Date.now()}@open.com`,
        gender: 'female',
        status: 'inactive'
    };

    //JS Object to JSON: Serialization
    let response = await request.put('https://gorest.co.in//public/v2/users/8608580', {
        headers: AUTH_TOKEN,
        data: userData
    });

    //console.log(response);

    let jsonbody = await response.json();
    console.log(jsonbody);
    console.log(response.status()); // 200
    console.log(response.statusText()); // OK
})

test('Delete user test', async ({request}) => {


    //JS Object to JSON: Serialization
    let response = await request.delete('https://gorest.co.in//public/v2/users/8608580', {
        headers: AUTH_TOKEN
    });

    //console.log(response);
    console.log(response.status()); // 204
    console.log(response.statusText()); // No Content
})

// Assignment - Write more testcases on this API automation

test('Update user test using patch', async ({request}) => {

    //JS Object
    const userData = {
        status: 'inactive'
    };

    //JS Object to JSON: Serialization
    let response = await request.put('https://gorest.co.in//public/v2/users/8610257', {
        headers: AUTH_TOKEN,
        data: userData
    });

    //console.log(response);

    let jsonbody = await response.json();
    console.log(jsonbody);
    console.log(response.status()); // 200
    console.log(response.statusText()); // OK
})
