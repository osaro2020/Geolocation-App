import { getDatabase, ref, remove } from "firebase/database";

export function deleteUser(){
    const db = getDatabase();
    const userRef:any = ref(db, 'users/' + window.user.uid);
    remove(userRef);
}