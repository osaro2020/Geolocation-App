# GeoPing

GeoPing is a cross-platform mobile application (iOS & Android) built with Ionic React and Firebase that alerts road users — drivers, cyclists, and pedestrians — of nearby users in real time. It uses geolocation to broadcast a user's position and notifies them of others within a configurable range, helping improve road safety through awareness.

---

## Features

- **Role-based tracking** — Users register as a driver, biker, or walker. Each role sees only the relevant other user types (e.g. drivers see nearby cyclists and pedestrians).
- **Real-time proximity alerts** — Location data is continuously synced to Firebase Realtime Database. Users within range receive directional toast notifications (e.g. "Cyclist Moving: NE").
- **Cardinal direction calculation** — A bearing formula translates coordinate differences into compass directions (N, NE, E, SE, S, SW, W, NW).
- **Text-to-speech** — Directional alerts can be spoken aloud via the Capacitor TTS plugin.
- **Push notifications** — OneSignal integration delivers push notifications on Android and iOS.
- **Road sign detection (Raspberry Pi module)** — A companion Python module (`car_module.py`) runs on a Raspberry Pi with a camera. It uses OpenCV and a Haar cascade classifier to detect road work signs and writes the result to Firebase, where it can be surfaced to app users.
- **Authentication** — Full Firebase Auth flow: register, login, password reset, and account deletion.
- **PWA support** — Service worker registration enables offline caching and faster repeat loads.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Ionic React + Capacitor |
| Language | TypeScript (app), Python (Pi module) |
| Backend / DB | Firebase Realtime Database |
| Auth | Firebase Authentication |
| Push notifications | OneSignal (Cordova plugin) |
| Road sign detection | OpenCV, Haar cascade classifier |
| Pi camera | Picamera2 |
| Pi GUI | guizero |
| TTS | `@capacitor-community/text-to-speech` |

---

## Project Structure

```
src/
├── App.tsx                    # Root component, routing
├── index.tsx                  # Entry point, global window.user object
├── firebaseConfig.ts          # Firebase init, auth helpers (login, register, reset, delete)
├── sendData.ts                # Write user location + status to Firebase
├── deleteUser.ts              # Remove user node from Firebase
├── getUsers.ts                # Fetch nearby users by role
├── getDriverData.ts           # Query drivers within range
├── getBikerData.ts            # Query cyclists within range
├── getWalkerData.ts           # Query pedestrians within range
├── distanceFormula.ts         # Haversine distance calculation (returns feet)
├── directionFormula.ts        # Bearing-to-cardinal-direction calculation
├── directionNotification.ts   # Role-aware toast notification logic
├── getDirections.ts           # Aggregate directions for all nearby user groups
├── snapToArr.ts               # Firebase snapshot → array helper
├── getEmptyMap.ts             # Initialize empty user group map
├── mapStruct.ts               # Map factory utility
├── statusIcons.ts             # Ionicon map for driver/biker/walker roles
├── showAndroidAlert.tsx       # Android location permission alert component
├── toast.ts                   # Capacitor Toast wrapper
├── ttsStop.ts                 # Stop TTS playback
├── service-worker.ts          # Workbox PWA service worker
├── serviceWorkerRegistration.ts
└── reportWebVitals.ts

car_module.py                  # Raspberry Pi road sign detection module
```

---

## Getting Started

### Prerequisites

- Node.js and npm
- Ionic CLI: `npm install -g @ionic/cli`
- Capacitor CLI
- A Firebase project with Realtime Database and Authentication enabled
- (Optional) OneSignal account for push notifications
- (Optional) Raspberry Pi with camera module for road sign detection

### Environment Variables

Create a `.env` file in the project root with the following keys:

```
REACT_APP_FB_KEY=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FB_DATABASE_URL=
REACT_APP_MSG_SENDER=
REACT_APP_MEASUREMENT_ID=
REACT_APP_ONESIGNAL_ANDROID=
REACT_APP_ONESIGNAL_IOS=
```

### Installation

```bash
npm install
ionic build
```

### Running locally (web)

```bash
ionic serve
```

> Note: OneSignal initialization is skipped on web (`platform != 'web'` guard in `App.tsx`).

### Running on device

```bash
ionic capacitor add android   # or ios
ionic capacitor run android   # or ios
```

---

## Raspberry Pi Module (`car_module.py`)

The Pi module runs independently on a Raspberry Pi with a connected camera. It:

1. Captures an image via `Picamera2`.
2. Runs a Haar cascade classifier (`stop_sign_classifier_2.xml`) to detect road work signs.
3. Writes the detection result (`road_work_ahead` or `empty_string`) to the Firebase node for a hardcoded driver UID.

### Pi Prerequisites

```bash
pip install guizero picamera2 opencv-python firebase-admin
```

Place `fbase_credentials.json` (Firebase service account key) and `stop_sign_classifier_2.xml` in the same directory as `car_module.py`.

### Running

```bash
python car_module.py
```

Use the **START** button in the GUI to trigger detection, and **END** to exit.

---

## Firebase Data Model

```
users/
  {uid}/
    status: "driver" | "biker" | "walker"
    coordinates: [latitude, longitude]
    timeSince1970: number
    date: string
    roadSign/
      name: "road_work_ahead" | "empty_string"
```

---

## Testing

```bash
npm test
```

The test suite uses React Testing Library. `setupTests.ts` mocks `window.matchMedia` for Ionic compatibility.

---

## License

This project is unlicensed. All rights reserved.
