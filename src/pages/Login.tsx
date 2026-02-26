import { IonAlert, IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from '../firebaseConfig';
import { toast } from '../toast';

import './Home.css';

const Login: React.FC = () => {
    const [busy, setBusy] = useState<boolean>(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);

    const history = useHistory();

    async function login(){
        
        setBusy(true);
        const res = await loginUser(email, password);
        if(!res){
            toast("Login Failed!", 2000, "bottom");
            history.push('/login');
        } else {
            toast("Login Success!", 2000, "top");
            window.localStorage.setItem('isLogged', 'true');
            setAlertOpen(true);
            history.push('/menu');
        }
        setBusy(false);
    }

  return (
    <IonPage>
      <IonAlert
        isOpen={alertOpen}
        header="Confirm"
        subHeader="Please make sure you are connected to the internet."
        
        buttons={['OK']}
        onDidDismiss={() => setAlertOpen(false)}
      ></IonAlert>

      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="One moment please..." duration={0} isOpen={busy} />
      <IonContent fullscreen className = "ion-text-center">
        <IonInput placeholder="Email" style = {{fontSize: '18px'}} onIonChange={(e: any) => setEmail(e.target.value)}></IonInput>
        <IonInput placeholder="Password" type = "password" style = {{fontSize: '18px'}} onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
        <IonButton className = "homeButton" color= "dark" onClick={login}>Login</IonButton>

        <p style={{fontSize: '18px'}}>New Here? <Link to = "/register" style={{color: 'green', textDecoration: 'none'}}>Register</Link></p>
        {/* <p style={{fontSize: '18px'}}>Forgot Password? <Link to = "/resetpassword" style={{color: 'green', textDecoration: 'none'}}>Reset Password</Link></p> */}
      </IonContent>
    </IonPage>
  );
};

export default Login;
