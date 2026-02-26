import { IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Home.css';
import { resetUserPassword } from '../firebaseConfig';
import { toast } from '../toast';

const ResetPassword: React.FC = () => {
    const [busy, setBusy] = useState<boolean>(false);

    const [email, setEmail] = useState('');

    const history = useHistory();

    async function resetPassword(){
        
        setBusy(true);

        const res = await resetUserPassword(email);

        if(res){
            history.push('/login');
            toast("Reset Password Email Sent", 30000, "start");
        }
        setBusy(false);
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Reset Password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="One moment please..." duration={0} isOpen={busy} />
      <IonContent fullscreen className = "ion-text-center">
        <p style={{padding: '1.6rem', fontSize: '18px'}}>Need to reset password? Please click button below to send reset password email.</p>
        <IonInput placeholder="Enter Email" style = {{fontSize: '18px'}} onIonChange={(e: any) => setEmail(e.target.value)}></IonInput>
        <IonButton className = "homeButton" color= "dark" onClick={resetPassword}>Reset Password</IonButton>
        <p style={{fontSize: '18px'}}>Go Back To Login? <Link to = "/login" style={{color: 'green', textDecoration: 'none'}}>Login</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default ResetPassword;
