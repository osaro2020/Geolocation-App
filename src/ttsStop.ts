import { TextToSpeech } from '@capacitor-community/text-to-speech';

export async function cancelSpeech(){
    await TextToSpeech.stop();
    
}