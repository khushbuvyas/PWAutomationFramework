import { test, expect, request, APIResponse } from '@playwright/test';
import { json } from 'node:stream/consumers';


let AUTH_TOKEN = { Authorization: 'Bearer 4e74530924a1711a8f94298ad6d243cb050c04814ca2b79fc4030b02ecf6e11f' };
let response: APIResponse;
let userData;
let Jsonbody;

test('Get the user api test - GET Call', async ({ request }) => {

    response = await request.get('https://gorest.co.in//public/v2/users/8610257', {
        headers: AUTH_TOKEN
    })

    Jsonbody = await response.json();
    console.log(response.status());
    console.log(response.statusText());
})

test('Create the user api test - POST Call', async ({ request }) => {

    userData = {
       name: 'Peter',
       email: `automation${Date.now()}@opentest.com`,
       gender: 'Male',
       status: 'active'
    };

    response = await request.post('https://gorest.co.in//public/v2/users', {
        headers: AUTH_TOKEN,
        data: userData
    })

    Jsonbody = await response.json();
    console.log(response.status());
    console.log(response.statusText());
})

