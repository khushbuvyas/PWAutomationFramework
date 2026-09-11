import {test as baseTest} from '@playwright/test';
import {APIUtils} from '../utils/APIUtils';

type apiFixtures = {
    apiUtils: APIUtils
};

export let test = baseTest.extend<apiFixtures>({

    apiUtils: async ({request}, use ) => {
        let apiUtils = new APIUtils(request, process.env.API_BASE_URI!);
        use(apiUtils)
    }

});


export { expect } from '@playwright/test';

