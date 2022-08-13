interface ChestInfo {
    summoner_name: string;
    summoner_id: string;
    has_chest: Champion[];
    recommended: Champion[];
    version: string;
  }
  
  interface Champion {
    name: string;
    title: string;
    key: string;
    champion_points: number;
    image: Image;
    has_chest: boolean;
    id: string;
  }
  
  interface Image {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  }