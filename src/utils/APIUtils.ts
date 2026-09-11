import { APIRequestContext } from "@playwright/test";

export class APIUtils {

    private readonly request: APIRequestContext;
    private readonly baseURI: string;

    constructor(request: APIRequestContext, baseURI: string) {
        this.request = request;
        this.baseURI = baseURI;
    }

    //GET
    async get(endPoint: string, headers?: Record<string, string>) {
        let response = await this.request.get(`${this.baseURI}${endPoint}`, {
            headers: headers
        });

      //  console.log("API Get response:", response);
        return {
            status: response.status(),
            body: await response.json()
        }

    }

    //POST
    async post(endPoint: string, data:object,  headers?: Record<string, string>) {
        let response = await this.request.post(`${this.baseURI}${endPoint}`, {
            headers: headers,
            data:data
        });

        return {
            status: response.status(),
            body: await response.json()
        }

    }

    //PUT
        async put(endPoint: string, data:object,  headers?: Record<string, string>) {
        let response = await this.request.put(`${this.baseURI}${endPoint}`, {
            headers: headers,
            data:data
        });

        return {
            status: response.status(),
            body: await response.json()
        }

    }

    //DELETE
        async delete(endPoint: string,  headers?: Record<string, string>) {
        let response = await this.request.delete(`${this.baseURI}${endPoint}`, {
            headers: headers
        });

        return {
            status: response.status()
        }

    }

}