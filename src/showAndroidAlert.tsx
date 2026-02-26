import { Capacitor } from "@capacitor/core";
import { IonAlert, IonPage } from "@ionic/react";
import { useHistory } from "react-router";

export function showAndroidAlert(
  alertID: string,
  isAndroid: boolean,
  showAndroidPermission: string
) {
  const history = useHistory();

  return (
    
      <IonAlert
        isOpen={
          window.localStorage.getItem("androidPermissionCount") == "0" &&
          isAndroid &&
          showAndroidPermission == "true"
        }
        header="GeoPing uses location data while in use to notify you of appropriate GeoPing app users near your location."
        trigger={alertID}
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
              window.localStorage.setItem("androidPermissionCount", "1");
              window.localStorage.setItem("showAndroidPermission", "false");
            },
          },
        ]}
      ></IonAlert>
    
  );
}
