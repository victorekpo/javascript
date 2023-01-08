// Get-Process
// *Example parsing*
const str=`Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id  SI ProcessName
-------  ------    -----      -----     ------     --  -- -----------
    404      25    35204       1428       0.66   3508   1 AcrobatNotificationClient
    365      20     5400       8704       1.16  50248   1 acrotray`
const parseGetProcessLogs = (str: string) => {
    let arr: any = str.split('\n')
    const headers = arr?.[0]?.split(' ').filter((x: string) => x != '')

    arr[0] = headers;
    arr=[...arr.slice(0,1),...arr.slice(2)]
    const rows=arr.slice(1);
    for(let row in rows) {
        rows[row] = rows[row].split(' ').filter((x: string) => x != '');
    }
    // arr=[headers,...rows];
    const objVals = rows.reduce((stats: any, row: string[]) => {
        return row.reduce((stat: object, entry: string, j: number) => {
            return { ...stats, ...stat, [headers[j]]: [...(stats[headers[j]] || []), entry] }
        }, {});
    },{});

    const arrVals = rows.reduce((stats: any, row: any, i: number) => {
        return row.reduce((stat: any, entry: string, j: number) => {
            return [...stats, { ...stat[i], [headers[j]]: entry } ]
        }, {});
    },[]);
    return {
        objVals,
        arrVals
    };
}

console.log(parseGetProcessLogs(str));
