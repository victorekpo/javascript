export const runCommand = async (command: string, json: boolean = false): Promise<any> => {
    return new Promise((resolve, reject) => {
        const exec = require("child_process").exec;
        exec(
            command,
            (
                error: Error,
                stdout: string | Buffer,
                stderr: string | Buffer
            ) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (stderr) {
                    reject(stderr);
                    return;
                } else {
                    resolve(json ? JSON.parse(String(stdout)) : stdout);
                }
            }
        );
    });
};


// ALTERNTATIVE WITH UTIL.PROMISIFY
// export const runCommand = async (command: string, json: boolean = false) => {
//     const util = require('util');
//     const exec = util.promisify(require('child_process').exec);
//     const { stdout, stderr, error } = await exec(command);
//     return {
//         value: json ? JSON.parse(stdout) : stdout,
//         stderr,
//         error
//     }
// };