import { IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { deleteUserAcct } from '../firebaseConfig';
import { toast } from '../toast';
import './Home.css';

const DeleteUser: React.FC = () => {
    const [busy, setBusy] = useState<boolean>(false);

    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');

    const history = useHistory();

    async function checkassword(){
        if(password != cpassword){
            return toast("Passwords Do Not Match", 4000, "bottom");
        }

        setBusy(true);

        const res = await deleteUserAcct();

        if(res){
            history.push('/home');
            toast("Account Successfully Deleted", 15000, "top");
        }
        setBusy(false);
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Delete Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="One moment please..." duration={0} isOpen={busy} />
      <IonContent fullscreen className = "ion-text-center">
        <IonInput placeholder="Password" type = "password" style = {{fontSize: '18px'}} onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
        <IonInput placeholder="Confirm Password" type = "password" style = {{fontSize: '18px'}} onIonChange={(e: any) => setCPassword(e.target.value)}></IonInput>
        <IonButton className = "homeButton" color= "dark" onClick={checkassword}>Delete Account</IonButton>

        <p style={{fontSize: '18px'}}>Go Back To Login? <Link to = "/login" style={{color: 'green', textDecoration: 'none'}}>Login</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default DeleteUser;
