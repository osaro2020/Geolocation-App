import { IonAlert, IonButton, IonIcon, IonLoading, IonPage } from '@ionic/react';
import * as React from 'react';
import { useEffect, useState } from "react";
import Map, { Marker, NavigationControl } from 'react-map-gl';
import { useHistory } from 'react-router';
import { toast } from '../toast';
import './Map.css';

import { Geolocation } from '@capacitor/geolocation';

import { getDirections } from '../getDirections';
import { getUsers } from '../getUsers';
import { writeUserData } from '../sendData';


import { notification } from '../directionNotification';

import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";


import { KeepAwake } from '@capacitor-community/keep-awake';
import { deleteUser } from '../deleteUser';
import { getEmptyMap} from '../getEmptyMap';
import { speak } from '../ttsSpeak';
import { cancelSpeech } from '../ttsStop';
import { statusIcons } from '../statusIcons';
import { Capacitor } from '@capacitor/core';

// The following is required to stop "npm build" from transpiling mapbox code.
    // notice the exclamation point in the import.
    // @ts-ignore
    // eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const MapDisplay: React.FC = () => {

    const keepAwake = async () => {
      await KeepAwake.keepAwake();
    };

    //Check if user is logged in
    useEffect(() => {
      if(window.localStorage.getItem('isLogged') != 'true'){
        history.push('/login');
      }
      keepAwake();
    }, []);

    const [disableBtn, setDisableBtn] = useState(false);

    const history = useHistory();

    const [mapDisplay, setMapDisplay] = useState({
      latitude: 0,
      longitude: 0,
      zoom: 15.5
   });

    const mapTheme:string = new Date().getHours() > 20 || new Date().getUTCHours() < 8 ?  "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v10";

    let usersDirections = getEmptyMap();

    const status = window.user.movement;

    const mapboxToken = process.env.REACT_APP_MAPBOX;

    const okColor = 'green';

    const alertColor = '#FF5F15';

    const RANGE = 250;

    const [indicatorColor, setIndicator] = useState('green');
    
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isStartClicked, setIsStartClicked] = useState(false);
    const [isStopClicked, setIsStopClicked] = useState(false);
    const [showNotification, setShowNotification] = useState(true);

    const [busy, setBusy] = useState<boolean>(false);

    const utterance1 = "";
    const utterance2 = "Cyclist nearby.";
    const utterance3 = "Pedestrian nearby.";
    const utterance4 = "Cyclist and Pedestrian nearby.";
    const utterance5 = "Driver nearby.";

    const timeSince1970 = new Date().getTime();

     //Say directions every n number of seconds
     useEffect(() => {
      const interval = setInterval(async () => {
        if (isSpeaking) {
          if(window.user.movement == "driver" && usersDirections.get(0).length > 0 && usersDirections.get(1).length > 0) await speak(utterance4);
          else if(window.user.movement == "driver" && usersDirections.get(0).length > 0) await speak(utterance2);
          else if(window.user.movement == "driver" && usersDirections.get(1).length > 0) await speak(utterance3);
          else if(window.user.movement == "biker" && usersDirections.get(0).length > 0) await speak(utterance5);
          else if(window.user.movement == "walker" && usersDirections.get(0).length > 0) await speak(utterance5);
        }
      }, 4500);
  
      return () => {
        clearInterval(interval);
      };
    }, [isSpeaking]);

    useEffect(() => {
      if(isStopClicked) deleteUser();
      const populateInterval = setInterval(async () => {if(isStartClicked) await populateScreen()}, 1000);
      const fetchInterval = setInterval(async () => {if(isStartClicked) await fetchUsersDirections();}, 1000);
      const toastInterval = setInterval(() => {if(showNotification && !isStopClicked) notification(usersDirections);}, 2000);
      
      setTimeout(() => setBusy(false), 4000);

      return () => {
        clearInterval(populateInterval);
        clearInterval(fetchInterval);
        clearInterval(toastInterval);
      }
    }, [isStartClicked, showNotification, isStopClicked]);


      const populateScreen = async () => {

        const pos = await Geolocation.getCurrentPosition({enableHighAccuracy:true, timeout:15000});
        
        if(pos){

          setMapDisplay({
            ...mapDisplay,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            zoom: 15.5
          });

          window.user.coordinates = [pos.coords.latitude, pos.coords.longitude];

          //Write to Database
          await writeUserData(window.user.uid, window.user.movement, window.user.coordinates, timeSince1970, new Date(timeSince1970).toUTCString());

        } else {
          if(isStartClicked) toast('Error retrieving location. Please try again.', 2000, "top");
        }
        
    }

    const fetchUsersDirections = async () => {
      let users = await getUsers(RANGE); 

      if(users.get(0).length > 0){
        usersDirections = getDirections(users);
        setIndicator(alertColor);
      } 

      else if(users.get(1).length > 0){
        usersDirections = getDirections(users);
        setIndicator(alertColor);
      }

      else {
        usersDirections = getEmptyMap();
        setIndicator(okColor);
      }

    }

  return (
    
    <IonPage>
      <IonLoading message="One moment please..." duration={0} isOpen={busy} />
      
      <div>
      (
        <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
          <h1 style = {{
          // backgroundColor: 'rgba(35, 55, 75, 0.9)',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          padding: '4px 8px',
          fontFamily: 'monospace',
          zIndex: '1',
          position: 'relative',
          top: '0',
          left: '0',
          margin: '12px',
          marginTop: '150px',
          borderRadius: '4px',
          alignItems: 'center',
          justifyContent: 'center',
          
          }}>Mode: {(status.charAt(0).toUpperCase() + status.slice(1)).replace('er', 'ing')} <IonIcon icon={statusIcons().get(status)} style = {{ fontSize: 20 }}></IonIcon>
          </h1>
        </div>

        <div className='ring' style={{backgroundColor: indicatorColor}}></div>
        
        <div>
          <Map
            mapboxAccessToken={mapboxToken}
            initialViewState={mapDisplay}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              height: "90vh",
              width: "100vw",
              transform: "translate(-50%, -50%)"
            }}
            latitude={mapDisplay.latitude}
            longitude={mapDisplay.longitude}
            mapStyle={mapTheme}
            zoom={16.5}
            attributionControl = {false}
          >
            <Marker
              color='green'
              longitude={mapDisplay.longitude}
              latitude={mapDisplay.latitude}
            />
            <NavigationControl 
            
              showCompass={true}
              showZoom={false}
            />
        
          </Map>
          <div>
          <IonButton className = "mapButtonTop" color="success" size="large" disabled = {disableBtn} onClick={() => {
            setDisableBtn(true);
            setBusy(true);
            if(!isStartClicked){
                setIsSpeaking(!isSpeaking);
                setIsStartClicked(true);
                setIsStopClicked(false);
                setShowNotification(true);
              }
            }}>START</IonButton>
          <IonButton className = "mapButton" color="danger" size="large" routerLink = "/menu" onClick={async () => {
            setDisableBtn(false);
            cancelSpeech();
            if(!isStopClicked){
                setIsSpeaking(!isSpeaking);
                setIsStartClicked(false);
                setIsStopClicked(true);
                setShowNotification(false);
            }
            setTimeout(() => deleteUser(), 8000);
            }}>END</IonButton>
          </div>
        </div>
      )
        </div>
    </IonPage>
    
  );
}

export default MapDisplay;