import { runCommand } from "../exec/runCommand";

export const getSplashTopLogs = async () => {
    const fullResult: any = await runCommand('PowerShell.exe "Get-WinEvent -MaxEvents 1 -FilterHashtable @{Logname=\'Splashtop-Splashtop Business app-Remote Session/Operational\'} | ConvertTo-Json"', true);

    const transformTime = (time: string) => {
        const timeRegex = new RegExp(/\/Date\((.*)\)\//,'ig');
        const epochTime = Number(time.replaceAll(timeRegex, "$1"));
        return new Date(epochTime).toLocaleString();
    }

    const transformMessage = (message: string) => {
        return message.replaceAll('\r\n'," ").replaceAll('\n'," ");
    }

    const result = {
        time: transformTime(fullResult['TimeCreated']),
        machineName: fullResult['MachineName'],
        message: transformMessage(fullResult['Message']),
        properties: fullResult['Properties'].reduce((props:any, val:any) => [...(props || []),val['Value']], []),
        processID: fullResult['ProcessId'],
        level: fullResult['Level']
    };
    console.log(result);
    return result;
}