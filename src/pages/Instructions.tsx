import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import './Instructions.css';

const Instructions: React.FC = () => {
    

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Instructions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className = "ion-text-center">
      <div style={{textAlign: "center", fontSize: "18px"}}>
            <p>Step 1: Once registered and signed in and while in a stationary position 
                select from the three methods of commute: “Driving”, “Biking”, “Walking”</p>
            <p>Step 2: While still in a stationary position tap START when ready</p>
            <p>Step 3: Set aside phone and depending on your menu selection you will get voice and text alerts</p>
            <p>Step 4: When there are alerts the pulsating status indicator will change color</p>
            <p>Step 5: When finished with your commute tap END</p>
            <p>Step 6: When app is no longer in use it is recommended to close app - 
                Please see phone guidelines for how to close a mobile app on your device</p>
        </div>
        <IonButton className = "homeButton" color= "dark" routerLink="/menu">Back</IonButton>

        
      </IonContent>
    </IonPage>
  );
};

export default Instructions;
