// buy programs before SF4
//https://pastebin.com/8g83kTxM
export async function main(ns) {
    let output
    const exeList = ["AutoLink.exe", "BruteSSH.exe",  "FTPCrack.exe", "HTTPWorm.exe", "NUKE.exe", "SQLInject.exe", "relaySMTP.exe", "DeepscanV2.exe", "DeepscanV1.exe", "ServerProfiler.exe", "Formulas.exe"]
 
    exeList.forEach(function (exe) {
        output = "buy " + exe
        if (ns.fileExists(exe) == false) {
            while (ns.fileExists(exe) == false) {
                const terminalInput = document.getElementById("terminal-input")
                const handler = Object.keys(terminalInput)[1]
                terminalInput.value = output
                terminalInput[handler].onChange({ target: terminalInput })
                terminalInput[handler].onKeyDown({ keyCode: 13, preventDefault: () => null })
                ns.sleep(50);
            }
            ns.toast("You bought: " + exe + ".")
        } else {
            ns.toast(exe + " was bought already.")
        }
    })
    ns.alert("You own all .exe files.")
    ns.exit()
}
