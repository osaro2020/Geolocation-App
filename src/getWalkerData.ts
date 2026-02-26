import { getDatabase, ref, onValue, query, orderByChild, equalTo } from "firebase/database";
import { distance } from './distanceFormula';
import { snapToArr } from './snapToArr';

export async function getWalkerData(range:any){
    const res:number[] = [];

    const db = getDatabase();
    const userRef = ref(db, 'users/');
    const users = query(userRef, orderByChild('status'), equalTo('walker'));
    onValue(users, (snapshot) => {
        
        const data = snapToArr(snapshot);
    
        data.forEach((el:any)=> {
            if(distance(el.coordinates[0], el.coordinates[1]) <= range){
                res.push(el.coordinates);
         }
    })
});

return res;

}

