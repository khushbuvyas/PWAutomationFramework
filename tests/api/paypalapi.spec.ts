import { request } from '@playwright/test';
import { test, expect } from '../../src/fixtures/apifixtures';

let OAUTH_CONFIG = {
    tokenURL: 'v1/oauth2/token',
    clientId: process.env.PAYPAL_OAUTH_CLIENT_ID!,
    clientSecret: process.env.PAYPAL_OAUTH_CLIENT_SECRET!,
    grantType: process.env.PAYPAL_GRANT_TYPE!
}

test('POST -- generate the access token', async ({request}) =>{

    


})