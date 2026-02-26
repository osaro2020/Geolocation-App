import { IonButton, IonFooter, IonGrid, IonIcon, IonPage, IonRow, IonToolbar } from '@ionic/react';
import {
  bicycleOutline, carSportOutline, walkOutline
} from 'ionicons/icons';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    // if(window.localStorage.getItem('isLogged') == 'true') history.push('/menu');
    if(window.localStorage.getItem('isLogged') == 'true' || window.localStorage.getItem('isLogged') != 'true') history.push('/home');
  }, []);
  
  return (
    <IonPage>
      <IonGrid>
      <IonRow className="ion-justify-content-center">
        <h1 className="ion-text-center" style = {{ fontSize: 50 }}>GeoPing</h1>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <img src={process.env.PUBLIC_URL + '/assets/logo.png'} style = {{ display: 'block', width: '200px' }}></img>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonButton className = "homeButton" color='dark' size='large' routerLink="/login">Login</IonButton>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonButton className = "homeButton" color="dark" size="large" routerLink="/register">Register</IonButton>
        </IonRow>
      </IonGrid>
      <IonFooter>
        <IonToolbar>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
          <IonIcon icon={carSportOutline} style = {{ paddingRight: '25px', fontSize: 40 }}></IonIcon>
          <IonIcon icon={bicycleOutline} style = {{ paddingRight: '25px', fontSize: 40 }}></IonIcon>
          <IonIcon icon={walkOutline} style = {{ fontSize: 40 }}></IonIcon>
          </IonRow>
        </IonGrid>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
