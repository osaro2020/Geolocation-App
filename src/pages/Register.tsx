import { IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Home.css';
import { registerUser } from '../firebaseConfig';
import { toast } from '../toast';

const Register: React.FC = () => {
    const [busy, setBusy] = useState<boolean>(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');

    const history = useHistory();

    async function register(){
        if(password != cpassword){
            return toast("Passwords Do Not Match", 2000, "bottom");
        }
        if(email.trim() === '' || password.trim() === ''){
            return toast("Email and Password Are Requiered", 2000, "bottom");
        }
        if(email.indexOf('@') === -1 || email.indexOf('.com') === -1){
            return toast("Invalid Email", 2000, "bottom");
        }

        setBusy(true);

        const res = await registerUser(email, password);

        if(res){
            history.push('/login');
            toast("Registration Success!", 4000, "bottom");
            toast("Please Login", 8000, "top");
        }
        setBusy(false);
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Registration in progress..." duration={0} isOpen={busy} />
      <IonContent fullscreen className = "ion-text-center">
        <IonInput placeholder="Email" style = {{fontSize: '18px'}} onIonChange={(e: any) => setEmail(e.target.value)}></IonInput>
        <IonInput placeholder="Password" type = "password" style = {{fontSize: '18px'}} onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
        <IonInput placeholder="Confirm Password" type = "password" style = {{fontSize: '18px'}} onIonChange={(e: any) => setCPassword(e.target.value)}></IonInput>
        <IonButton className = "homeButton" color= "dark" onClick={register}>Register</IonButton>

        <p style={{fontSize: '18px'}}>Already Have An Account? <Link to = "/login" style={{color: 'green', textDecoration: 'none'}}>Login</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default Register;
