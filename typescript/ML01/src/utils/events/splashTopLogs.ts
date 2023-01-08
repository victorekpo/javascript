import { runCommand } from "../exec/runCommand";

export const getSplashTopLogs = async () => {
    const fullResult: any = await runCommand('PowerShell.exe "Get-WinEvent -MaxEvents 1 -FilterHashtable @{Logname=\'Splashtop-Splashtop Business app-Remote Computer Info/Operational\'} | ConvertTo-Json"', true);
    console.log(fullResult, "RESULT")

    const result = {
        time: fullResult['TimeCreated'],
        machineName: fullResult['MachineName'],
        message: fullResult['Message'],
        properties: fullResult['Properties'],
        processID: fullResult['ProcessId'],
        level: fullResult['Level']
    }
    console.log(result);
    return result;
}