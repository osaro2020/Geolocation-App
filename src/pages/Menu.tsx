import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonPage,
} from "@ionic/react";
import {
  bicycle,
  carSport,
  helpOutline,
  settingsOutline,
  walk,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "./Menu.css";

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper";

import { getAuth } from "firebase/auth";

import { useHistory } from "react-router";

import { signout } from "../signout";
import { deleteUser } from "../deleteUser";
import { Capacitor } from "@capacitor/core";
import { showAndroidAlert } from "../showAndroidAlert";

const Menu: React.FC = () => {
  const history = useHistory();

  const platform = Capacitor.getPlatform();

  const isAndroid = platform == "android";

  const [androidAlert, setAndroidAlert] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("isLogged") != "true") {
      history.push("/login");
    }
  }, []);

  const user = getAuth().currentUser;

  if (user !== null) {
    window.user.email = user.email;
    window.user.uid = user.uid;
  }

  function updateUser(status: string) {
    window.user.movement = status;
  }

  return (
    <IonPage>
      <IonAlert
        isOpen={isAndroid && androidAlert && window.localStorage.getItem("showAndroidPermission") == "true"}
        header="GeoPing uses location data while in use to notify you of appropriate GeoPing app users near your location."
        buttons={[
          {
            text: "DENY",
            role: "cancel",
            handler: () => {
              history.push("/menu");
            },
          },
          {
            text: "ACCEPT",
            role: "confirm",
            handler: () => {
              setAndroidAlert(false);
              window.localStorage.setItem("showAndroidPermission", "false")
            },
          },
        ]}
        onDidDismiss={() => setAndroidAlert(false)}
      ></IonAlert>

      <Swiper navigation={true} modules={[Navigation]}>
        <SwiperSlide>
          <IonCard
            id="alert1"
            color="dark"
            onClick={() => {
              updateUser("driver");
              setAndroidAlert(true);
            }}
            routerLink="/map"
          >
            <IonCardHeader>
              <IonCardTitle>Select Driving</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonIcon icon={carSport} style={{ fontSize: 80 }}></IonIcon>
            </IonCardContent>
          </IonCard>
        </SwiperSlide>

        <SwiperSlide>
          <IonCard
            id="alert2"
            color="dark"
            onClick={() => {
              updateUser("biker");
              setAndroidAlert(true);
            }}
            routerLink="/map"
          >
            <IonCardHeader>
              <IonCardTitle>Select Biking</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonIcon icon={bicycle} style={{ fontSize: 80 }}></IonIcon>
            </IonCardContent>
          </IonCard>
        </SwiperSlide>

        <SwiperSlide>
          <IonCard
            id="alert3"
            color="dark"
            onClick={() => {
              updateUser("walker");
              setAndroidAlert(true);
            }}
            routerLink="/map"
          >
            <IonCardHeader>
              <IonCardTitle>Select Walking</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonIcon icon={walk} style={{ fontSize: 80 }}></IonIcon>
            </IonCardContent>
          </IonCard>
        </SwiperSlide>
      </Swiper>
      <p style={{ zIndex: "10", position: "relative", textAlign: "center" }}>
        Close App When Not In Use
      </p>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          height: "12vh",
          paddingBottom: "20px",
        }}
      >
        <IonButton color="success" routerLink="/home" onClick={() => signout()}>
          Sign Out
        </IonButton>
        <IonButton
          color="danger"
          routerLink="/deleteacct"
          onClick={() => deleteUser()}
        >
          Delete Account
        </IonButton>
        <IonButton color="light" routerLink="/about">
          <IonIcon icon={helpOutline}></IonIcon>
        </IonButton>
        <IonButton color="light" routerLink="/instructions">
          <IonIcon icon={settingsOutline}></IonIcon>
        </IonButton>
      </div>
    </IonPage>
  );
};

export default Menu;
