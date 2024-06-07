/** @param {NS} ns */
export async function main(ns) {


let CorpsNameList = ns.infiltration.getPossibleLocations()
var CorpsNameArray = []
let CorpsCashArray = []
let CorpsRepArray = []
//ns.tprint(typeof(CorpsNameList))
//ns.tprint(CorpsNameList)
for (const items of CorpsNameList){
  
  //ns.tprint(item["name"])
  CorpsNameArray.push(items["name"])
  //console.log('items["name"]', items["name"])
  }


for (const item of CorpsNameArray){
    //console.log(item);
    const a = ns.infiltration.getInfiltration(item)
    let tradeRep = Math.floor(a["reward"]["tradeRep"])
    let sellCash = Math.floor(a["reward"]["sellCash"])
    var locationname = a["location"]["name"]
    //console.log("locationname ", locationname)
    CorpsCashArray.push({
    key:   locationname,
    value: sellCash    })
    CorpsRepArray.push({
    key:   locationname,
    value: tradeRep    })

}



CorpsCashArray.sort(function(a, b) {
    return a.value - b.value;
});


CorpsRepArray.sort(function(a, b) {
    return a.value - b.value;
});


ns.tprint("max cash: ", CorpsCashArray[CorpsCashArray.length - 1])
ns.tprint("max Rep: ", CorpsRepArray[CorpsRepArray.length - 1])
}
