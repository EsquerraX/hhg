# NutriSport Web v1.3.6


## Inicio de sesión

- **Google permanece disponible en la web** mediante Firebase Web `signInWithPopup`.
- Correo y contraseña continúan disponibles.
- El flujo nativo de Credential Manager se utiliza únicamente cuando la app se ejecuta como Android Capacitor.

## UX corregida

- Se eliminó el espacio blanco inferior causado por el padding global del `body`.
- El fondo de `html`, `body` y la aplicación usa el fondo real de NutriSport.
- La navegación inferior conserva su espacio funcional sin crear una franja blanca debajo.
- Favicon, PWA e icono de la web usan el mismo logo NutriSport de la aplicación: flama verde + barra.

## Firebase



## Google Login v1.3.6
- Web: Firebase `signInWithPopup`.
- Android: Credential Manager nativo con `useCredentialManager: true` y `skipNativeAuth: true`.
- No se usa fallback web/OAuth desde Android, evitando abrir Chrome.
- Google solo se ejecuta cuando el usuario pulsa el botón; no hay inicio automático.
