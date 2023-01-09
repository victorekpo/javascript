type DateArg = { y?: number, mth?: number, d?: number, h?: number, min?: number, s?: number, ms?: number };

export const runOnDate = (date: DateArg) => {
    const { y, mth, d, h, min, s, ms } = date;
    const now = new Date();
    const year = y || now.getFullYear();
    const month = mth || now.getMonth();
    const day = d || now.getDate();
    const hour = h || now.getHours();
    const minute = min || now.getMinutes();
    const sec = s || now.getSeconds();
    const milli = ms || now.getMilliseconds();

    let msRemainining = Number(new Date(year, month, day, hour, minute, sec, milli)) - Number(now);
    console.log("msRemaining",msRemainining);

    if (msRemainining < 0) { // it's after the time, try later.
        const nextMap: any = {
            s: 1000,
            min: 60000,
            h: 3600000,
            d: 86400000,
            mth: 2592000000,
            y: 31104000000
        }
        const getLeastArg = (): [string, string] => {
            return ms ? ['ms','s']
                : (s ? ['s','min']
                    : (min ? ['min','h']
                        : (h ? ['h','d']
                            : (d ? ['d','mth']
                                : ['mth','y']))))
        };

        const nextTime = nextMap[getLeastArg()[1]];
        console.log(nextTime);
        msRemainining += nextTime;
        console.log("it's after the time, running again in", msRemainining / nextMap[getLeastArg()[0]] || 1, getLeastArg()[0],'s');
    }

    setTimeout(() => {
        console.log(`It's ${date}!`)
    }, msRemainining);
}

