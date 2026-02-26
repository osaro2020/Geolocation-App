import { direction } from './directionFormula';

export function getDirections(users:any){
    const userDirections = new Map();

    for(let i = 0; i < users.size; i++){
        let dirArr:any = [];
      
        users.get(i).forEach((el:number[]) => {
            let cardDir = direction(window.user.coordinates, el);
            if(dirArr.indexOf(cardDir) == -1) dirArr.push(cardDir);
        })
        userDirections.set(i, dirArr);
    }

    return userDirections;

}

