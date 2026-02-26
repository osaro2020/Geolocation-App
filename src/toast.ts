//import { toastController } from "@ionic/core";
import { Toast } from '@capacitor/toast';

export async function toast(message: string, duration: any, position: any) {
       
      await Toast.show({
        text: message,
        duration: duration,
        position: position
      })
    

    
  }
