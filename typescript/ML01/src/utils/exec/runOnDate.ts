type DateArg = { y?: number, mth?: number, d?: number, h?: number, min?: number, s?: number, ms?: number, interval: string, loop: boolean };

export const runOnDate = (date: DateArg, cb: CallableFunction) => {
    console.log("\n\n*** Running Scheduled Task... ***");
    const { y, mth, d, h, min, s, ms, interval, loop } = date;
    const now = new Date();
    const year = y || now.getFullYear();
    const month = mth || now.getMonth();
    const day = d || now.getDate();
    const hour = h || now.getHours();
    const minute = min || now.getMinutes();
    const sec = (Number(s) * 1000) || 0;
    const milli = Number(ms) || 0;
    const timeMap: any = {
        s: 1000,
        min: 60000,
        h: 3600000,
        d: 86400000,
        mth: 2592000000,
        y: 31104000000
    };
    const printRunTime = (past: boolean = false) => `running ${past ? 'again' : 'for the first time'} in ${msRemaining / timeMap[interval] || 1} ${interval}s`;
    const newDate = new Date(year, month, day, hour, minute, 0, 0);
    console.log(`Scheduled Date ${newDate.toLocaleDateString()} @ ${newDate.getHours()}:${String(newDate.getMinutes()).padStart(2,"0")}:${s}.${ms}`);
    let msRemaining = (Number(newDate) - Number(now)) + sec + milli;

    if (msRemaining <= 0) { // it's after the time, try later.
        const getNextInterval = (i: string) => {
            return i === 'ms' ? 's'
                : (i === 's' ? 'min'
                    : (i === 'min' ? 'h'
                        : (i === 'h' ? 'd'
                            : (i === 'd' ? 'mth'
                                : 'y'))))
        };

        const nextTime = timeMap[getNextInterval(interval)];
        //console.log(nextTime);
        msRemaining += nextTime;
        console.log("\n** Alert: It is after the scheduled time,",printRunTime(true),"**");
    } else {
        console.log("msRemaining",msRemaining,printRunTime());
    }
    const runCallBack = async () => {
        console.log("Running task...", new Date());
        await cb();
        loop && runOnDate(date, cb);
    };
    setTimeout(runCallBack, msRemaining);
}

