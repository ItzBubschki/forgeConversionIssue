import ForgeUI, {Button, Fragment, HomepageFeed, render} from '@forge/ui';
import api from '@forge/api';

const App = () => {
    return (
        <Fragment>
            <Button onClick={async() => {
                await convert();
            }} text="convert something"/>
            <Button onClick={async() => {
                await retrieveTasks();
            }} text="get tasks"/>
        </Fragment>
    );
};

export const run = render(
    <HomepageFeed>
        <App/>
    </HomepageFeed>,
);

async function retrieveTasks() {
    console.log('Hello world');
    const TASK_URL = '/wiki/rest/api/inlinetasks/search';
    const result = await api.asUser().requestConfluence(TASK_URL);
    console.log(`Got tasks with result ${result.status}.`);
    const responseJson = await result.json();
    if (responseJson.size > 0) {
        console.log(`Here is one of your tasks: ${responseJson.results[0].body}`);
    } else {
        console.log('You currently don\'t have any tasks.');

    }
}

async function convert() {
    const CONVERT_URL = '/wiki/rest/api/contentbody/convert/view';
    const storageToConvert = '<span>this will likely fail</span>'; //change this to anything you want to try

    const bodyData = {
        value: storageToConvert,
        representation: 'storage',
    };
    let fails = 0;
    let success = 0;
    let other = 0;
    for (let i = 0; i < 10; i++) {
        const response = await api.asUser().requestConfluence(CONVERT_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        });
        if (response.status === 200) {
            success++;
        } else if (response.status === 401) {
            fails++;
        } else {
            other++;
        }
    }
    console.log(`${success} calls returned status code 200.`);
    console.log(`${fails} calls returned status code 401.`);
    if (other > 0) {
        console.log(`${other} calls returned a response code other from 200 and 401.`);
    }
}
