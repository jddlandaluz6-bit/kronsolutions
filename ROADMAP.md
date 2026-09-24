# Roadmap de lanzamiento — Kron Solutions

Estado a fecha de hoy y pasos que quedan para publicar la web de forma definitiva en `kronsolutions.es`.

## Ya hecho

- [x] Landing page bilingüe (ES/EN) construida y desplegada
- [x] Repositorio en GitHub (`jddlandaluz6-bit/kronsolutions`) conectado a Netlify con despliegue automático en cada `git push`
- [x] Sitio publicado y en modo público: https://stunning-kheer-35ef43.netlify.app
- [x] Formulario de contacto conectado a Netlify Forms, con notificaciones por email a `kronsolutions.contacto@gmail.com`
- [x] Identidad de marca aplicada: logo del diamante "KS" (SVG), paleta navy + cian
- [x] Animaciones del hero: retícula de puntos y símbolo KS ampliado que late solo al pasar el ratón, lanzando una onda difuminada que cruza todo el hero (máximo 2 ondas a la vez para no trabar el render)
- [x] Corregidas las ondas finas antiguas que aparecían al cargar la página
- [x] Sección "Cobertura 360°": carrusel 3D de iconos orbitando alrededor del título (inspirado en la sección "Captación" de prolibu.com), cabecera centrada, pausa fuera de pantalla y respeto a `prefers-reduced-motion`
- [x] Cabeceras de seguridad y caché (`netlify.toml`), página 404, `robots.txt` y `sitemap.xml`

## 1. Dominio y correo — prioridad alta

- [x] Dominio `kronsolutions.es` registrado en DonDominio el 24/09/2026 (caduca el 24/09/2027, renovación en modo **manual**: activar la renovación automática o apuntarse la fecha)
- [x] Dominio conectado a Netlify: DNS en DonDominio con `ANAME kronsolutions.es → apex-loadbalancer.netlify.com` y `CNAME www → stunning-kheer-35ef43.netlify.app`
- [x] Dominio principal `kronsolutions.es`; `www.kronsolutions.es` redirige automáticamente a él
- [x] Certificado HTTPS de Let's Encrypt activo (24/09/2026); http y www redirigen a https://kronsolutions.es
- [x] Correo de contacto provisional en la web: `kronsolutions.contacto@gmail.com` (bloque de contacto, texto de consentimiento y mensaje de error del formulario)
- [ ] Más adelante: correo corporativo con el dominio (Google Workspace, Zoho Mail u otro) y sustituir la dirección de Gmail en la web. Al hacerlo, cambiar en DonDominio los registros MX/SPF por los del proveedor elegido

## 2. Aspectos legales — prioridad alta (obligatorio en España/UE)

- [ ] **Aviso legal**: razón social, CIF/NIF, domicilio social y, si aplica, datos de inscripción registral
- [ ] **Política de privacidad**: base legal del tratamiento de datos del formulario, plazo de conservación, derechos de acceso/rectificación/supresión, y a quién dirigirse para ejercerlos
- [x] **Casilla de consentimiento** explícita y obligatoria en el formulario de contacto (se registra como `consent=yes` en Netlify Forms)
- [ ] Enlazar la política de privacidad desde el texto de la casilla en cuanto exista la página
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
- [ ] Comprobar la fluidez de las animaciones (onda del hero, carrusel de Cobertura 360°) en equipos modestos y móviles
- [ ] Accesibilidad básica: contraste de color, navegación por teclado, comportamiento con lector de pantalla
- [ ] Auditoría de rendimiento con Lighthouse (Netlify tiene el plugin integrado)
- [ ] Enviar el formulario de verdad y confirmar que la notificación llega correctamente al buzón final

## 6. Checklist de lanzamiento — prioridad baja (cosmético)

- [ ] Renombrar el proyecto en Netlify (actualmente `stunning-kheer-35ef43`) para que coincida con la marca
- [x] Confirmar certificado HTTPS activo sobre el dominio definitivo
- [ ] Anunciar la web (redes sociales, firma de email, tarjetas, etc.)

## 7. Post-lanzamiento

- [ ] Definir quién revisa y responde los leads que lleguen por el formulario, y con qué frecuencia
- [ ] Plan de mantenimiento de contenido (novedades, nuevos servicios, actualización de la sección "Nosotros")
- [ ] Revisar periódicamente Netlify Analytics/Search Console para ver tráfico y ajustar

---

*Documento vivo: marca las casillas a medida que se completen los pasos y añade lo que surja por el camino.*
