# NutriSport Android v1.3.6


## Incluye

- Google Login **nativo en Android** mediante `@capacitor-firebase/authentication` + Credential Manager.
- Firebase JS SDK 11.10.0 compatible con el plugin 7.5.0.
- Firebase Authentication y Firestore compartidos con la versión web.
- Icono Android personalizado usando el mismo logo NutriSport de la web: flama verde + barra.
- Nombre de aplicación: **NutriSport**.
- Workflow GitHub Actions con Java 21.
- Configuración Capacitor local alineada con el workflow (`skipNativeAuth: true`).

## Google Android

Paquete: `com.nutrisport.app`

SHA-1 de la clave debug incluida:
`46:81:19:F0:DA:CA:2C:51:23:FB:75:04:21:6C:E8:4F:00:83:79:C7`

SHA-256:
`F2:39:F8:DA:D5:58:6A:BC:77:47:F8:AA:05:D7:D2:3D:13:F6:31:C3:BF:F9:39:49:D1:73:7E:D9:A7:81:41:BC`

El `google-services.json` incluido corresponde a `com.nutrisport.app`.

## GitHub Actions

1. Sube el contenido de esta carpeta a la raíz del repositorio Android.
2. Conserva `google-services.json` en la raíz.
3. Ve a **Actions → NutriSport Android APK → Run workflow**.
4. El artefacto generado será `NutriSport-debug-apk`.

El workflow configura Node 22, Java 21, Firebase/Google Services, Credential Manager, iconos personalizados y la firma debug estable.

## Importante



## Google Login v1.3.6
- Web: Firebase `signInWithPopup`.
- Android: Credential Manager nativo con `useCredentialManager: true` y `skipNativeAuth: true`.
- No se usa fallback web/OAuth desde Android, evitando abrir Chrome.
- Google solo se ejecuta cuando el usuario pulsa el botón; no hay inicio automático.
