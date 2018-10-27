import {spawn} from "child-process-promise";

const cwd = `${process.cwd()}/spec/mockProject/`;

export {compile, execute, installModule, GeneratedFiles, cwd}

enum GeneratedFiles {
    MAIN_JS = 'main.js',
    MAIN_JS_MAP = 'main.js.map',
    MAIN_D_TS = 'main.d.ts',
}

async function installModule(moduleName: string) {
    const promise = spawn(`npm`, `link ${moduleName}`.split(' '), {cwd: cwd})
    promise.childProcess.stderr.on('data', (data) => {
        throw data.toString()
    });

    await promise
}

async function compile() {
    const promise = spawn(`ttsc`, `-p ./`.split(' '), {
        cwd: cwd
    });

    promise.childProcess.stderr.on('data', function(data) {
        console.log(data.toString())
    });

    promise.childProcess.stdout.on('data', function(data) {
        console.log(data.toString())
    });

    await promise
}

async function execute() {
    const promise = spawn(`node`, `./build/main.js`.split(' '), {cwd: cwd});
    promise.childProcess.stderr.on('data', (data) => {
        throw data.toString()
    });

    await promise
}
