import { aliases } from "../config/miscConfigs";
import { api } from "../DA/chestFinder/chestFinderApi";

export const urlsOfChampsWithChests = async(region:string, summoner_name:string):Promise<string[]> => {
    const chestInfo:ChestInfo = await api.getChestsInfo(region.toUpperCase(),summoner_name)
    const champsWithChest = chestInfo.has_chest.map(champ=>champ.name.replace(`'`,'').split(' ').map(word=>word[0].toUpperCase()+word.slice(1).toLowerCase()).join(''))
    champsWithChest.forEach((champ,index)=> {
        if(champ=="Wukong") champsWithChest[index] = "MonkeyKing"
        if(champ=="Nunu&Willump") champsWithChest[index] = "Nunu"
        if(champ=="RenataGlasc") champsWithChest[index] = "Renata"
    })
    const champsWithChestURL = champsWithChest.map(champ=>`https://ddragon.leagueoflegends.com/cdn/12.15.1/img/champion/${champ}.png`)

    return champsWithChestURL
}