# Premisas de seguridad — marcosibanezfandos.github.io

Reglas que **todo cambio en este repositorio debe cumplir** antes de mergear.
Aplica igual a código escrito a mano y a código generado por un asistente de IA.

Stack: sitio estático (HTML + React vía CDN) servido por GitHub Pages.

> Este repositorio es **público**, y además es tu portfolio: es la primera página
> que abre un reclutador. Un defacement aquí no roba datos, pero sí reputación.

Al ser estático y sin backend, la superficie es pequeña. Lo que importa es qué
código de terceros se carga y qué información personal se publica.

---

## 1. Secretos

- Un sitio estático **no puede guardar secretos**. Todo lo que esté en el HTML o
  el JS lo lee cualquiera con F12: no hay "ofuscación" que valga.
- Si alguna vez el sitio necesita hablar con una API con clave (formulario de
  contacto, analítica, un LLM), la clave **no va en el HTML**. Se llama a una
  función serverless / edge function (Vercel, Netlify, Cloudflare Workers,
  Supabase Edge Functions) que guarda la clave en su entorno y hace de
  intermediaria. El navegador nunca la ve.
- Para un formulario de contacto, lo más simple es un servicio dedicado
  (Formspree, Web3Forms) con el endpoint público que ya está pensado para ser
  visible — no una clave real.

---

## 2. Scripts de terceros

Cada script externo ejecuta código arbitrario en tu dominio con confianza total.
Si el CDN se ve comprometido, o si una dependencia publica una versión maliciosa,
el código entra en tu página sin que tú toques nada. `@latest` es especialmente
delicado: significa "dame lo que haya, sin revisarlo".

Reglas:

- **Fijar la versión exacta.** Nunca `@latest` ni rangos.
- **Subresource Integrity (SRI)** en todo script externo:
  ```html
  <script src="https://unpkg.com/lucide@1.28.0/dist/umd/lucide.min.js"
          integrity="sha384-..." crossorigin="anonymous"></script>
  ```
  Con SRI, si el fichero cambia un solo byte, el navegador lo bloquea.
- Para calcular el hash:
  ```bash
  curl -sL <url> | openssl dgst -sha384 -binary | openssl base64 -A
  ```

### Cuidado: SRI necesita CORS

`integrity` obliga a poner `crossorigin="anonymous"`, y eso convierte la carga en
una petición CORS. **Si el CDN no devuelve `Access-Control-Allow-Origin`, el
navegador bloquea el script y la página se rompe en silencio** — no salta ningún
error obvio, simplemente los estilos o la librería no aparecen.

Es exactamente lo que pasa con `cdn.tailwindcss.com`, que no envía cabeceras
CORS. Por eso Tailwind se sirve desde `vendor/` en este repositorio en lugar de
desde el CDN. unpkg sí las envía, así que ahí SRI funciona.

Comprobar antes de añadir SRI a un origen nuevo:
```bash
curl -sI -H "Origin: https://marcosibanezfandos.github.io" <url> | grep -i access-control
```

- **Siempre que se pueda, descargar la librería al repositorio** y servirla desde
  el propio dominio: elimina la dependencia del tercero (nadie puede cambiar ese
  fichero sin pasar por un commit), evita el problema de CORS y carga más rápido.
- Tras tocar cualquier script, **abrir la página y comprobar que sigue
  funcionando**: un SRI mal calculado la deja rota sin avisar.
- Tailwind por CDN y Babel en el navegador son herramientas de desarrollo. Para
  producción, compilar el CSS y el JSX y servir el resultado estático.
- No añadir scripts de terceros (widgets, trackers, chats) sin evaluar qué
  ejecutan y qué recogen.

---

## 3. Cabeceras y configuración

GitHub Pages no permite cabeceras HTTP personalizadas, pero sí meta tags:

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' https://unpkg.com;
               style-src 'self' 'unsafe-inline'; img-src 'self' data:;">
<meta name="referrer" content="strict-origin-when-cross-origin">
```

- Enforce HTTPS activado en Settings → Pages.
- Todo enlace externo con `rel="noopener noreferrer"`.
- Si algún día hacen falta cabeceras reales (HSTS, CSP en HTTP), mover el sitio a
  Cloudflare Pages o Netlify, que sí las soportan.

---

## 4. Información personal publicada

El repositorio incluye tu CV y varios PDF académicos, y son públicos e indexables
por Google para siempre.

- Revisar cada PDF antes de subirlo: **dirección postal, DNI, teléfono personal y
  fecha de nacimiento no deben aparecer**. Con nombre, email profesional y LinkedIn
  es suficiente.
- Comprobar también los **metadatos** del PDF (autor, software, rutas de fichero):
  ```bash
  exiftool -all= CV_Ibanez_Aug26.pdf
  ```
- Ojo con las capturas de pantalla: suelen colar tokens, rutas locales, nombres de
  proyectos privados o correos en pestañas abiertas.
- Recuerda que borrar un PDF del repositorio no lo quita del histórico de git ni
  de la caché de los buscadores.

---

## 5. Validación de entradas

Mientras el sitio sea puramente estático, no hay entrada de usuario que validar.
Si se añade un formulario o cualquier contenido dinámico:

- Validar en el servidor (la función serverless), no solo en el navegador.
- Escapar todo dato del usuario antes de insertarlo en el DOM. Nada de
  `innerHTML` ni `dangerouslySetInnerHTML` con contenido no saneado.
- Nada de parámetros de la URL escritos directamente en la página: es XSS directo.
- Rate limiting en el endpoint del formulario (~5 envíos/hora por IP) y captcha o
  honeypot contra bots.

---

## 6. Checklist antes de abrir una PR

- [ ] Cero secretos o claves de API en el HTML/JS.
- [ ] Los scripts externos tienen versión fijada y SRI.
- [ ] Ningún PDF o imagen nueva expone datos personales sensibles ni metadatos.
- [ ] Los enlaces externos llevan `rel="noopener noreferrer"`.
- [ ] Ningún dato del usuario se inserta en el DOM sin escapar.

---

## Reportar un problema

Si encuentras un fallo de seguridad, no abras un issue público: escribe a
marcos.elbosque@gmail.com.
