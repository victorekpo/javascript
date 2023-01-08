const util = require('util');
const exec = util.promisify(require('child_process').exec);

export const runCommand = async (command: string, json: boolean = false) => {
    const { stdout, stderr, error } = await exec(command);
    return {
        value: json ? JSON.parse(stdout) : stdout,
        stderr,
        error
    }
};