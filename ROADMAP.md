# Roadmap de lanzamiento — Kron Solutions

Estado a fecha de hoy y pasos que quedan para publicar la web de forma definitiva en `kronsolutions.es`.

## Ya hecho

- [x] Landing page bilingüe (ES/EN) construida y desplegada
- [x] Repositorio en GitHub (`jddlandaluz6-bit/kronsolutions`) conectado a Netlify con despliegue automático en cada `git push`
- [x] Sitio publicado y en modo público: https://stunning-kheer-35ef43.netlify.app
- [x] Formulario de contacto conectado a Netlify Forms, con notificaciones por email a `jddlandaluz6@gmail.com`
- [x] Identidad de marca aplicada: logo del diamante "KS" (SVG), paleta navy + cian
- [x] Animaciones del hero (retícula de puntos, latido del logo, onda al hover)
- [x] Cabeceras de seguridad y caché (`netlify.toml`), página 404, `robots.txt` y `sitemap.xml`

## 1. Dominio y correo — prioridad alta

- [ ] Registrar `kronsolutions.es` (o confirmar el dominio definitivo si cambia)
- [ ] Conectar el dominio en Netlify (Domain settings → Add a domain) y esperar la propagación DNS/HTTPS
- [ ] Si el dominio final es distinto de `kronsolutions.es`, actualizar las referencias en `index.html`, `404.html`, `robots.txt`, `sitemap.xml` y `README.md`
- [ ] Configurar correo corporativo real para `hola@kronsolutions.es` (Google Workspace, Zoho Mail u otro) — ahora mismo esa dirección solo aparece como texto de contacto, no existe como buzón real
- [ ] Decidir y configurar si la web vive en `kronsolutions.es` o `www.kronsolutions.es`, con redirección desde el otro

## 2. Aspectos legales — prioridad alta (obligatorio en España/UE)

- [ ] **Aviso legal**: razón social, CIF/NIF, domicilio social y, si aplica, datos de inscripción registral
- [ ] **Política de privacidad**: base legal del tratamiento de datos del formulario, plazo de conservación, derechos de acceso/rectificación/supresión, y a quién dirigirse para ejercerlos
- [ ] **Casilla de consentimiento** explícita en el formulario de contacto (hoy solo hay un texto informativo, sin checkbox que el usuario deba marcar)
- [ ] **Política de cookies** y banner de consentimiento — necesario en cuanto se instale cualquier herramienta de analítica
- [ ] Términos y condiciones, si en el futuro se contratan servicios directamente desde la web

## 3. Contenido final — prioridad media

- [ ] Revisión editorial completa de los textos en español e inglés (tono, erratas, coherencia)
- [ ] Confirmar el logo definitivo: el SVG actual es una vectorización propia a partir de la imagen de referencia; si el diseñador entrega archivos de marca oficiales, sustituir `assets/img/logo-mark.svg` y `favicon.svg`
- [ ] Añadir una imagen `og:image` para que los enlaces compartidos en redes sociales se vean bien
- [ ] Decidir si se añaden logos de clientes reales o casos de éxito (ahora mismo la sección de sectores es genérica, sin nombres)

## 4. SEO y analítica — prioridad media

- [ ] Elegir e instalar una herramienta de analítica (Google Analytics, Plausible, Fathom…) — condiciona la política de cookies
- [ ] Verificar el dominio en Google Search Console y enviar el `sitemap.xml`
- [ ] Revisar metadatos (`title`, `description`, `og:*`) una vez fijado el contenido final

## 5. Pruebas antes de publicar — prioridad media

- [ ] Revisión cross-browser (Chrome, Safari, Firefox, Edge)
- [ ] Pruebas en móvil real (iOS/Android), no solo en el emulador del navegador
- [ ] Accesibilidad básica: contraste de color, navegación por teclado, comportamiento con lector de pantalla
- [ ] Auditoría de rendimiento con Lighthouse (Netlify tiene el plugin integrado)
- [ ] Enviar el formulario de verdad y confirmar que la notificación llega correctamente al buzón final

## 6. Checklist de lanzamiento — prioridad baja (cosmético)

- [ ] Renombrar el proyecto en Netlify (actualmente `stunning-kheer-35ef43`) para que coincida con la marca
- [ ] Confirmar certificado HTTPS activo sobre el dominio definitivo
- [ ] Anunciar la web (redes sociales, firma de email, tarjetas, etc.)

## 7. Post-lanzamiento

- [ ] Definir quién revisa y responde los leads que lleguen por el formulario, y con qué frecuencia
- [ ] Plan de mantenimiento de contenido (novedades, nuevos servicios, actualización de la sección "Nosotros")
- [ ] Revisar periódicamente Netlify Analytics/Search Console para ver tráfico y ajustar

---

*Documento vivo: marca las casillas a medida que se completen los pasos y añade lo que surja por el camino.*
