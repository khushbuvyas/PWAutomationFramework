import { test, expect } from '../src/fixtures/pagefixtures';
import { HomePage } from '../src/pages/HomePage';
import { SearchResultPage } from '../src/pages/SearchResultPage';
import { Csvutils } from '../src/utils/Csvutils';


const testdata = Csvutils.readCsv('src/testdata/registeracc.csv');

for (let data of testdata) {
    test(`Verify user account registration for ${data.firstname} `, async ({ registerAccPage }) => {
        await registerAccPage.goToRegisterAccPage();
        await registerAccPage.verifyHeader();
        await registerAccPage.registerUserAcc(data.firstname, data.lastname, data.email, data.telephone, data.password, data.confirmPassword);
        expect(await registerAccPage.verifySuccessRegAccMsg()).toBe('Your Account Has Been Created!');
    });

}


