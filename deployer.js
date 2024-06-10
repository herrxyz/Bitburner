/** @param {NS} ns **/
//https://steamcommunity.com/sharedfiles/filedetails/?id=2717682356
export async function main(ns) {
  let servers = [];
  let ramPerThread = ns.getScriptRam("earlier-hacking2.js");
  let serversToScan = ns.scan("home");
  let currentHackingLevel = ns.getHackingLevel()
  let i = 0;
  let j = 0;
  var textblock = ""
  while (serversToScan.length > 0) {
    j++
    textblock += "i " + i + "    j " + j + "\r\n"
    //while (i <= 10) {

    let server = serversToScan.shift();
    if (!servers.includes(server) && server !== "home") {
    //if (!servers.includes(server) && server !== "home" && server.indexOf("daemon") == -1) {
      servers.push(server);
      serversToScan = serversToScan.concat(ns.scan(server));
      textblock += "server " + server + "               reqHackingLevel " + ns.getServerRequiredHackingLevel(server) + " root: " + ns.hasRootAccess(server) + "\r\n"
      if (!ns.hasRootAccess(server)) {
        i++
        //if (currentHackingLevel >> ns.getServerRequiredHackingLevel(server)) {
        // Get root access
        let openPorts = 0;
        if (ns.fileExists("BruteSSH.exe")) {
          ns.brutessh(server);
          openPorts++;
        }
        if (ns.fileExists("FTPCrack.exe")) {
          ns.ftpcrack(server);
          openPorts++;
        }
        if (ns.fileExists("RelaySMTP.exe")) {
          ns.relaysmtp(server);
          openPorts++;
        }
        if (ns.fileExists("HTTPWorm.exe")) {
          ns.httpworm(server);
          openPorts++;
        }
        if (ns.fileExists("SQLInject.exe")) {
          ns.sqlinject(server);
          openPorts++;
        }
        if (ns.getServerNumPortsRequired(server) <= openPorts) {
          ns.nuke(server);
        }
      }
      if (ns.hasRootAccess(server)) {
        // Deploy the 'early-hack-template' script
        //ns.killall(server);
        await ns.scp("earlier-hacking2.js", server);
        let ramAvailable = ns.getServerMaxRam(server)
          - ns.getServerUsedRam(server);
        let threads = Math.floor(ramAvailable / ramPerThread);
        textblock += "server " + server + " has root,"
        if (threads > 0) {
          //  if (i % 2 == 0) {
          ns.exec("earlier-hacking2.js", server, threads, "n00dles");
          textblock += " deploying script with " + threads + " threads \r\n"
          //  }
        }
        else {
          textblock += "ALERT --- " + threads + " threads \r\n"
        }
      }
      //}

    }
    //}
  }
  ns.write("textlog.txt", textblock, "w")
  await ns.sleep(30000)
}
