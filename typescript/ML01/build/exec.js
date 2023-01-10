const exe = require('@angablue/exe');

const build = exe({
    entry: 'C:\\Users\\Victor\\projects\\javascript\\typescript\\ML01\\dist\\index.js',
    out: 'C:\\Users\\Victor\\projects\\javascript\\typescript\\ML01\\dist\\runBots.exe',
    pkg: [ '--options','max_old_space_size=4096'], // Specify extra pkg arguments
    version: '2.4.2',
    target: 'node16-win-x64',
    icon: 'runBots.ico', // Application icons must be in .ico format
    properties: {
        FileDescription: 'testing 123',
        ProductName: 'Reminder',
        LegalCopyright: 'Reminder Test',
        OriginalFilename: 'runBots.exe'
    }
});

build.then(() => console.log('Build completed!'));