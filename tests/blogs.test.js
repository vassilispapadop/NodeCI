const Page = require('./helpers/page');

let page;

beforeEach( async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000');
});

afterEach( async () => {
    await page.close();
});


describe.only('When logged in', async () => {
    beforeEach( async () => {
        await page.login();
        await page.click('a.btn-floating');
    });

    test('Can see blog create form', async () => {
        const label = await page.GetContentsOf('form label');
        expect(label).toEqual('Blog Title');
    });
    
    describe('And using valid inputs', async () => {
        beforeEach(async () => {
            const title = await page.type('.title input', ' My title');
            const content = await page.type('.content input', 'My content');
            await page.click('form button');
        });

        test('Submitting takes user to review screen', async () => {
            const text = await page.GetContentsOf('h5');
            expect(text).toEqual('Please confirm your entries');
        });

        test('Submitting and then saving adds blog', async () => {
            await page.click('button.green');
            await page.waitFor('.card');
            
            const title = await page.GetContentsOf('.card-title');
            const content = await page.GetContentsOf('p');

            expect(title).toEqual('My title');
            expect(content).toEqual('My content');
        });
    });

    describe('And using invalid inputs', async () => {
        beforeEach( async ()=> {
            await page.click('form button');
        });
        
        test('the from show an error messge', async () => {
            const titleError = await page.GetContentsOf('.title .red-text');
            const contentError = await page.GetContentsOf('.content .red-text');

            expect(titleError).toEqual('You must provide a value');
            expect(contentError).toEqual('You must provide a value');

        });
    });
});


describe('User not logged in', async () => {
    test('User cannot create blog posts', async () => {
        const data = { title: 'Fetch title', content: 'Fetch content' };
        const result = await page.post('/api/blogs', data);

        expect(result).toEqual({error: 'You must log in!'});
    });

    test('User cannot see blogs', async () => {
        const result = await page.get('/api/blogs');

        expect(result).toEqual({error: 'You must log in!'});

    });

});

