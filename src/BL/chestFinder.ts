import { aliases } from "../config/miscConfigs";
import { api } from "../DA/chestFinder/chestFinderApi";

export const urlsOfChampsWithChests = async(region:string, summoner_name:string):Promise<string[]> => {
    const chestInfo:ChestInfo = await api.getChestsInfo(region.toUpperCase(),summoner_name)
    const champsWithChestURL = chestInfo.has_chest.map(champ=>`https://ddragon.leagueoflegends.com/cdn/12.15.1/img/champion/${champ.id}.png`)

    return champsWithChestURL
}