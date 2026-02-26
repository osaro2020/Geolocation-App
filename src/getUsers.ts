import { getBikerData } from './getBikerData';
import { getWalkerData } from './getWalkerData';
import { getDriverData } from './getDriverData';

export async function getUsers(range:any){
    const users = new Map();

    if(window.user.movement == 'driver'){
      users.clear();
      const bikerData = await getBikerData(range);
      const walkerData = await getWalkerData(range);
      users.set(0, bikerData);
      users.set(1, walkerData);
    } else if(window.user.movement == 'biker'){
      users.clear();
      const driverData = await getDriverData(range);
      users.set(0, driverData);
      users.set(1, []);
    } else if(window.user.movement == 'walker'){
      users.clear();
      const driverData = await getDriverData(range);
      users.set(0, driverData);
      users.set(1, []);
    }

    return users;
  }