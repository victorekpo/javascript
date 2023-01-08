import { runCommand } from "../exec/runCommand";

export const getSplashTopLogs = async () => {
    const fullResult: any = await runCommand('PowerShell.exe "Get-WinEvent -MaxEvents 1 -FilterHashtable @{Logname=\'Splashtop-Splashtop Business app-Remote Computer Info/Operational\'} | ConvertTo-Json"', true);

    const result = {
        time: fullResult.value['TimeCreated'],
        machineName: fullResult.value['MachineName'],
        message: fullResult.value['Message'],
        properties: fullResult.value['Properties'],
        processID: fullResult.value['ProcessId'],
        userID: fullResult.value['UserId'],
        level: fullResult.value['Level']
    }
    console.log(result);
    return result;
}