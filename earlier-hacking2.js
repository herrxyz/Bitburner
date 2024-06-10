/** @param {NS} ns */

export async function main(ns) {
  // Defines the "target server", which is the server
  // that we're going to hack. In this case, it's "n00dles"


  //let totalRam = ns.getServerMaxRam (ns.getHostname());
  //let ramUsed = ns.getServerUsedRam (ns.getHostname());
  //let ramFree = totalRam - ramUsed
  //let maxthreads = Math.floor(ramFree/ns.getScriptRam("earlier-hacking2.js"))
  //s.alert("ram used by this script is "+ns.getScriptRam("test.js")+", possible to run "+(ramFree/ns.getScriptRam("test.js"))+" threads" )


  //ns.exec("early-hack-template.script", serverName, 1, "n00dles");
  //ns.args[0]



  //var target = ns.args[0] || ns.getHostname()
  let currentHackingLevel = ns.getHackingLevel()
  if (currentHackingLevel < 10) { var target = "n00dles" }
  else if (currentHackingLevel < 30) { var target = "joesguns" }
  //else if (currentHackingLevel < 120) { var target = "harakiri-sushi" }
  //else if (currentHackingLevel < 360) { var target = "iron-gym" }

  else { var target = "joesguns" }

  //   var target = ns.getHostname()

  // Defines how much money a server should have before we hack it
  // In this case, it is set to 75% of the server's max money
  var moneyThresh = await ns.getServerMaxMoney(target) * 0.75;

  // Defines the maximum security level the target server can
  // have. If the target's security level is higher than this,
  // we'll weaken it before doing anything else
  var securityThresh = await ns.getServerMinSecurityLevel(target) + 5;


  // Infinite loop that continously hacks/grows/weakens the target server
  while (true) {
    if (await ns.getServerSecurityLevel(target) > securityThresh) {
      // If the server's security level is above our threshold, weaken it
      await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      // If the server's money is less than our threshold, grow it
      await ns.grow(target);
    } else {
      // Otherwise, hack it
      await ns.hack(target);
    }
  }
}
