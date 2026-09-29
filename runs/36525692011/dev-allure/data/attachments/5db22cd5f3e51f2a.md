# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/users.api.sep.spec.ts >> @smoke @regression Running e2e gorest crud api tests >> GET API -- get all users
- Location: tests/api/users.api.sep.spec.ts:12:5

# Error details

```
TypeError: apiRequestContext.get: Invalid URL
```

# Test source

```ts
  1  | import { APIRequestContext } from "@playwright/test";
  2  | 
  3  | export class APIUtils {
  4  | 
  5  |     private readonly request: APIRequestContext;
  6  |     private readonly baseURI: string;
  7  | 
  8  |     constructor(request: APIRequestContext, baseURI: string) {
  9  |         this.request = request;
  10 |         this.baseURI = baseURI;
  11 |     }
  12 | 
  13 |     //GET
  14 |     async get(endPoint: string, headers?: Record<string, string>) {
> 15 |         let response = await this.request.get(`${this.baseURI}${endPoint}`, {
     |                                           ^ TypeError: apiRequestContext.get: Invalid URL
  16 |             headers: headers
  17 |         });
  18 | 
  19 |       //  console.log("API Get response:", response);
  20 |         return {
  21 |             status: response.status(),
  22 |             body: await response.json()
  23 |         }
  24 | 
  25 |     }
  26 | 
  27 |     //POST
  28 |     async post(endPoint: string, data:object,  headers?: Record<string, string>) {
  29 |         let response = await this.request.post(`${this.baseURI}${endPoint}`, {
  30 |             headers: headers,
  31 |             data:data
  32 |         });
  33 | 
  34 |         return {
  35 |             status: response.status(),
  36 |             body: await response.json()
  37 |         }
  38 | 
  39 |     }
  40 | 
  41 |     //PUT
  42 |         async put(endPoint: string, data:object,  headers?: Record<string, string>) {
  43 |         let response = await this.request.put(`${this.baseURI}${endPoint}`, {
  44 |             headers: headers,
  45 |             data:data
  46 |         });
  47 | 
  48 |         return {
  49 |             status: response.status(),
  50 |             body: await response.json()
  51 |         }
  52 | 
  53 |     }
  54 | 
  55 |     //DELETE
  56 |         async delete(endPoint: string,  headers?: Record<string, string>) {
  57 |         let response = await this.request.delete(`${this.baseURI}${endPoint}`, {
  58 |             headers: headers
  59 |         });
  60 | 
  61 |         return {
  62 |             status: response.status()
  63 |         }
  64 | 
  65 |     }
  66 | 
  67 | }
```