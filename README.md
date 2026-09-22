# Cronos Solutions — Web

Landing page estática (HTML/CSS/JS puro, sin build step) para **Cronos Solutions**, consultoría B2B de gestión operativa, eficiencia financiera y captación de talento técnico.

## Estructura

```
index.html        Página principal (una sola landing, bilingüe ES/EN)
404.html           Página de error personalizada
css/styles.css      Estilos (paleta verde bosque/oliva + bronce/grafito)
js/main.js          Header sticky, menú móvil, selector de idioma, animaciones, formulario
assets/img/          Recursos gráficos (favicon provisional, logo a futuro)
robots.txt, sitemap.xml   SEO básico
netlify.toml         Configuración de despliegue y cabeceras de seguridad/caché
```

No requiere `npm install` ni build: son archivos estáticos servidos tal cual.

## Zonas reservadas para el logo

Buscar el comentario `LOGO ZONE` en `index.html` (header, hero y footer). Cuando exista el isotipo definitivo, sustituir el contenido de `.logo-mark` por el logo real (SVG/PNG) conservando la clase para heredar tamaño y animación de entrada.

## Desplegar en Netlify (recomendado)

### Opción A — Con GitHub (despliegue continuo)

1. Crea una cuenta en [github.com](https://github.com/signup) si aún no tienes.
2. Crea un repositorio nuevo (vacío, sin README) en GitHub, por ejemplo `cronos-solutions-web`.
3. Desde esta carpeta, conecta y sube el código:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/cronos-solutions-web.git
   git branch -M main
   git push -u origin main
   ```
4. Entra a [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
5. Conecta tu cuenta de GitHub y selecciona el repositorio `cronos-solutions-web`.
6. Netlify detectará `netlify.toml` automáticamente (publish = `.`, sin build command). Pulsa **Deploy**.
7. Cada `git push` a `main` volverá a desplegar el sitio automáticamente.

### Opción B — Sin Git (arrastrar y soltar)

1. Entra a [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastra la carpeta completa del proyecto a la ventana del navegador.
3. Netlify publica el sitio al instante con una URL tipo `random-name.netlify.app`.
4. Para actualizar más adelante, vuelve a arrastrar la carpeta con los cambios.

## Conectar el dominio propio (cronossolutions.es)

1. En el panel del sitio en Netlify: **Domain settings → Add a domain**.
2. Introduce `cronossolutions.es`.
3. Netlify te dará los registros DNS a configurar (normalmente un registro `A` o `CNAME` hacia Netlify) en el panel de tu proveedor de dominio.
4. Netlify emite el certificado HTTPS automáticamente una vez verificado el DNS (puede tardar hasta 24h en propagarse).

## Formulario de contacto

El formulario ya está conectado a **Netlify Forms** (`data-netlify="true"` en `index.html` + envío AJAX en `js/main.js`). No requiere backend propio ni otra cuenta: en cuanto el sitio se despliega en Netlify, los envíos aparecen en **Site settings → Forms** del panel, y se pueden configurar notificaciones por email desde ahí (Site settings → Forms → Form notifications).

> Solo funciona una vez desplegado en Netlify (no en `localhost` ni en otros hosts). Si en el futuro se cambia de proveedor, sustituir el `fetch('/')` de `js/main.js` por el endpoint del nuevo servicio (Formspree, EmailJS, backend propio, etc.).

## Pendiente antes de producción

- [ ] Sustituir el logo placeholder por el isotipo/monograma definitivo.
- [ ] Activar notificaciones por email del formulario en Netlify (Site settings → Forms → Form notifications).
- [ ] Registrar el dominio `cronossolutions.es` si aún no está reservado.
- [ ] Añadir una imagen `og:image` para vistas previas en redes sociales.
