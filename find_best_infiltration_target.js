/** @param {NS} ns */
export async function main(ns) {

// // ns.singularity.getAugmentationPrereq(augName) 	Get the pre-requisite of an augmentation.
// // ns.singularity.getAugmentationRepReq(augName) 	Get reputation requirement of an augmentation.
// // ns.singularity.getFactionRep(faction) 	Get faction reputation.
// // ns.singularity.goToLocation(locationName) 	Go to a location.
// // ns.singularity.hospitalize() 	Hospitalize the player.


  function updateObjectInArray(array, key, updatedObject) {
    return array.map((obj) => {
      if (obj.key === key) {
        return { ...obj, ...updatedObject };
      }
      return obj;
    });
  }


  let joined_factions = ns.getPlayer().factions


  let OwnedAugs = (ns.singularity.getOwnedAugmentations())

  if (OwnedAugs.includes("SoA - phyzical WKS harmonizer"))
  {
  joined_factions = joined_factions.filter(item => item !== "Shadows of Anarchy");
  //joined_factions = joined_factions.filter(item => !["Shadows of Anarchy"].includes(item));
  }


  let joined_factions_with_rep = []
  var max_rep_needed_per_faction = []

  //ns.tprint(OwnedAugs)
  let AllCompletedFactions = []
  for (const item of joined_factions){
    joined_factions_with_rep.push([item, Math.floor(ns.singularity.getFactionRep(item))])
    let existingAugsFromFaction = ns.singularity.getAugmentationsFromFaction(item)
    let difference = existingAugsFromFaction.filter(item => !OwnedAugs.includes(item));
    if (difference.length != 0)
    {ns.tprint(item," number of missing augs: ",difference.length)
    
    
      
      for (const augName of difference)
      {
        if (ns.singularity.getAugmentationPrereq(augName).length != 0)
        {ns.tprint("skipped ",augName, " because of pre_req ",ns.singularity.getAugmentationPrereq(augName))}
      
        else 
        {
          //ns.tprint(augName,"; need ", ns.singularity.getAugmentationRepReq(augName), "rep, have ",Math.floor(ns.singularity.getFactionRep(item)))
          if (ns.singularity.getFactionRep(item) < ns.singularity.getAugmentationRepReq(augName) )
          {
            // getAugmentationFactions(augName) //check which other Faction does the Aug have and if they are in list joined_factions, check if we have more Rep with them
            //ns.tprint("max_rep_needed_per_faction ", max_rep_needed_per_faction,"; item ", item)
            max_rep_needed_per_faction.push({key:   item, value: ns.singularity.getAugmentationRepReq(augName) });
          }
        }

      }
    }


    else
    {AllCompletedFactions.push(item)}
  }


  //console.log(max_rep_needed_per_faction)


  // keep only max rep required key-value-pairs, drop others
  let maxValues = max_rep_needed_per_faction.reduce((acc, current) => {
    if (!acc[current.key] || acc[current.key].value < current.value) {
          acc[current.key] = current;
      }
      return acc;
    }, {});
  // Convert the result object back to an array
  max_rep_needed_per_faction = Object.values(maxValues);
  console.log(max_rep_needed_per_faction)




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
    //console.log(a)
    let tradeRep = Math.floor(a["reward"]["tradeRep"])
    let sellCash = Math.floor(a["reward"]["sellCash"])
    var locationname = a["location"]["name"]
    //console.log("locationname ", locationname)
    CorpsCashArray.push({
    "name":   locationname,
    value: sellCash,
    "city" : a["location"]["city"]
    })
    CorpsRepArray.push({
    "name":   locationname,
    value: tradeRep,
    "city" : a["location"]["city"]
    })
  }



  CorpsCashArray.sort(function(a, b) {
      return a.value - b.value;
  });


  CorpsRepArray.sort(function(a, b) {
      return a.value - b.value;
  });


  //ns.tprint("max cash: ", CorpsCashArray[CorpsCashArray.length - 1])
  //ns.tprint("max Rep: ", CorpsRepArray[CorpsRepArray.length - 1])
  console.log(CorpsRepArray[CorpsRepArray.length - 1].city)

  ns.tprint("going to location ", CorpsRepArray[CorpsRepArray.length - 1].city," ", ns.singularity.goToLocation(CorpsRepArray[CorpsRepArray.length - 1].city))

  let moneyvar = true

  ns.tprint(max_rep_needed_per_faction[1].key, typeof(max_rep_needed_per_faction[1].key))
  for (const i in max_rep_needed_per_faction)
    {console.log(max_rep_needed_per_faction[i])
    if (ns.singularity.getFactionRep(max_rep_needed_per_faction[i].key) < max_rep_needed_per_faction[i].value)
    max_rep_needed_per_faction[i].value
      {ns.exec("infiltration.js", "home", 1, '--auto', '--faction', max_rep_needed_per_faction[1].key);
      ns.tprint("work for faction ", max_rep_needed_per_faction[1].key, " ",ns.singularity.workForFaction(max_rep_needed_per_faction[1].key, "hacking"))
      ns.tprint("work for faction ", max_rep_needed_per_faction[1].key, " ",ns.singularity.workForFaction(max_rep_needed_per_faction[1].key, "field"))
      //ns.tprint("work for faction ", max_rep_needed_per_faction[1].key, " ",ns.singularity.workForFaction("BitRunners", "hacking", false))
      moneyvar = false
      break
      }
  if (moneyvar)    
  {
    {ns.exec("infiltration.js", "home", 1, '--auto');
    }
  }

}
