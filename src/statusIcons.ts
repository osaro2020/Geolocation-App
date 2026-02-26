import { bicycleOutline, carSportOutline, walkOutline } from "ionicons/icons";

export function statusIcons(){
    const icons = new Map<string, any>();

    icons.set('driver', carSportOutline);
    icons.set('biker', bicycleOutline);
    icons.set('walker', walkOutline);

    return icons;
}