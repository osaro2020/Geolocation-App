import { getDatabase, ref, set } from "firebase/database";

export async function writeUserData(userId: number, status: string, coords: number[], timeSince1970:number, date:string) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    status: status,
    coordinates : coords,
    timeSince1970: timeSince1970,
    date: date
  });
}