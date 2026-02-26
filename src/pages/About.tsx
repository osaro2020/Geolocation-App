import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import './About.css';

const About: React.FC = () => {
    

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className = "ion-text-center">
        <div style={{textAlign: "center", fontSize: "18px"}}>
            <p>GeoPing is intended to add as a layer of safety for you and others while commuting 
                and we encourage you to use best judgement when utilizing the GeoPing application.</p>
            <p>Do not operate application while driving or moving.</p>
            <p>Start application while in a stationary and safe position.</p>
            <p>Once application is started set aside and continue your commute. 
                    Auditory and visual alerts will be sent when necessary.</p>
            <p>To learn more, please visit our website at https://geoping.site</p>
        </div>
        <IonButton className = "homeButton" color= "dark" routerLink="/menu">Back</IonButton>

         
      </IonContent>
    </IonPage>
  );
};

export default About;
