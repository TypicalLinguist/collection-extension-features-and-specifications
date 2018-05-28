import {After, Given, Then, When} from 'cucumber';
import * as assert from "assert";
import {existsAsync, removeAsync} from "fs-extra-promise";
import {compile, cwd, GeneratedFiles, installModule} from "./helpers";

const And = Given;

let error: Error;

Given(`I have installed {string}`, async function (moduleName) {
    await installModule(moduleName);
    assert(await existsAsync(`${cwd}/node_modules/${moduleName}`), `${moduleName} is not installed`)
});

And(`wrote code that has no other syntactical or semantic errors`, async function () {
    assert(await existsAsync(`${cwd}/main.ts`))
});

When(`I compile the code`, async function () {
    try {
        await compile();
    } catch (e) {
        error = e
    }
});

Then(`I should not see any errors`, function () {
    if (error)
        throw error
});

And(`The compiled code should exist`, async function () {
    for (let keys in GeneratedFiles) {
        await existsAsync(`${GeneratedFiles[keys]}`)
    }
});

After("@compileCode", async function (...args: any[]) {
    for (let keys in GeneratedFiles) {
        await removeAsync(`${cwd}/${GeneratedFiles[keys]}`);
    }
});