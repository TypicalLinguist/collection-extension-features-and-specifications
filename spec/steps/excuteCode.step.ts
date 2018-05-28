import {Given, Then, When} from "cucumber";
import {compile, cwd, execute} from "./helpers";
import {readJsonSync} from "fs-extra-promise";
import {expect} from 'chai';
import {PluginConfig} from "ttypescript/lib/PluginCreator";

const And = Given;

let error: Error;

Given(`I have included the transformer in my package config`, async function () {
    const pluginConfigs: PluginConfig[] = [
        {
            transform: "@typical-linguist/collections-extension-transformer"
        }
    ];

    const tsconfig = await readJsonSync(`${cwd}/tsconfig.json`);
    expect(tsconfig.compilerOptions.plugins).to.deep.equal(pluginConfigs)
});

And(`the code has no other logical errors`, async function () {
});

And(`the code has been compiled`, async function () {
    await compile();
});

When(`I execute the compiled code`, async function () {
    try {
        await execute()
    } catch (e) {
        error = e
    }
});

Then(`the code should execute without fail`, function () {
    if (error) {
        throw error
    }
});