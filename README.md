# Personal Portfolio — Marcos Ibáñez

Sitio web personal y currículum online de **Marcos Ibáñez Fandos**,
Ingeniero de Telecomunicaciones. Página de una sola vista (*single-page*)
con secciones de experiencia, proyectos, publicaciones, formación,
certificaciones y voluntariado, con soporte multi-idioma y modo claro/oscuro.

## 🌐 Acceso / Visualización

**En vivo:** https://marcosibanezfandos.github.io

El sitio está **activo** y alojado gratuitamente en **GitHub Pages**.
No requiere instalación: basta con abrir la URL en cualquier navegador.

## 🧱 Cómo está hecho

- **Un único `index.html`** que monta una interfaz tipo React con clases de
  utilidad estilo TailwindCSS.
- **`.nojekyll`** para que GitHub Pages sirva los ficheros tal cual, sin
  procesarlos con Jekyll.
- Documentos descargables incluidos en el repo:
  - `CV_MarcosIbanez_2026.pdf` — currículum.
  - `Memoria_Entrega_Final_MarcosIbanez.pdf` — memoria del proyecto final.
  - `Hybrid_Neural Networks_Marcos Ibanez_2025.pdf` — publicación.

## 💻 Ejecución en local

Al ser un sitio estático no necesita compilación. Basta con servir la carpeta:

```bash
git clone https://github.com/MarcosIbanezFandos/marcosibanezfandos.github.io.git
cd marcosibanezfandos.github.io
python3 -m http.server 8000     # http://localhost:8000
```

También puedes abrir `index.html` directamente en el navegador.

## 🚀 Despliegue

Cualquier `push` a la rama por defecto se publica automáticamente en
**GitHub Pages** en `https://marcosibanezfandos.github.io` (gratuito y sin
mantenimiento de servidor).

---

Marcos Ibáñez Fandos — [@MarcosIbanezFandos](https://github.com/MarcosIbanezFandos)
