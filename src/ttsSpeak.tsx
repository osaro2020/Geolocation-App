import { TextToSpeech } from "@capacitor-community/text-to-speech";

export async function speak(sentence:any){
    
        await TextToSpeech.speak({
            text: sentence,
            lang: 'en-US',
            rate: 1.0,
            pitch: 1.0,
            volume: 1.0,
            category: 'ambient',
          });

}