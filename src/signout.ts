import { signOutUser } from "./firebaseConfig";
import { toast } from "./toast";

export async function signout(){

    window.localStorage.removeItem('isLogged');

    const res = await signOutUser();

    if(!res){
        toast("Sign Out Failed", 2000, "bottom");
    } else {
        toast("Sign Out Success!", 2000, "top");
    }

}