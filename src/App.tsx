import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Menu';
import MapDisplay from './pages/MapDisplay';
import ResetPassword from './pages/ResetPassword';
import DeleteUser from './pages/DeleteUser';
import About from './pages/About';
import Instructions from './pages/Instructions';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import OneSignal from 'onesignal-cordova-plugin';

/* Theme variables */
import './theme/variables.css';
import { Capacitor } from '@capacitor/core';

setupIonicReact();

const App: React.FC = () => {
  const platform = Capacitor.getPlatform();
  const OneSignalInit = () => {
    //ANDROID
    const androidKey:any = process.env.REACT_APP_ONESIGNAL_ANDROID;
    
    //IOS
    const iosKey:any = process.env.REACT_APP_ONESIGNAL_IOS;

    const key = platform == 'ios' ? iosKey : androidKey;

    OneSignal.setAppId(key);
    OneSignal.setNotificationOpenedHandler(function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  });

  // Prompts the user for notification permissions.
  //    * Since this shows a generic native prompt, we recommend instead using an In-App Message
  //to prompt for notification permission (See step 7) to better communicate to your users 
  //what notifications they will get.
  OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
      console.log("User accepted notifications: " + accepted);
  });
    
  }

  //Un-comment when ready to deploy on mobile, only commented for web
  if(platform != 'web') OneSignalInit();

  if(platform == 'android'){
    window.localStorage.setItem("showAndroidPermission", "true");
  }

  return(
    <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/resetpassword" component={ResetPassword} exact />
        <Route path="/deleteacct" component={DeleteUser} exact />
        <Route path="/menu" component={Menu} exact={true} />
        <Route path="/map" component={MapDisplay} />
        <Route path="/about" component={About} />
        <Route path="/instructions" component={Instructions} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  );
}

export default App;
