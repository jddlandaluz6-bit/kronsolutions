# Kron Solutions — Web

Landing page estática (HTML/CSS/JS puro, sin build step) para **Kron Solutions**, consultoría B2B de gestión operativa, eficiencia financiera y captación de talento técnico.

**En producción:** https://stunning-kheer-35ef43.netlify.app (público, desplegado desde `main` en [github.com/jddlandaluz6-bit/kronsolutions](https://github.com/jddlandaluz6-bit/kronsolutions)). Cada `git push` a `main` vuelve a desplegar automáticamente.

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

## Marca

Logo e identidad visual (navy oscuro + cian brillante) basados en el isotipo del diamante "KS". El logo vectorizado vive en `assets/img/logo-mark.svg` (y su variante simplificada en `assets/img/favicon.svg`); se usa como `<img>` dentro de `.logo-mark` en el header, el footer y el fondo del hero. Para reemplazarlo por una versión futura, basta con sustituir ese archivo SVG (o apuntar `src` a uno nuevo) — no hace falta tocar el CSS.

## Desplegar en Netlify — ya configurado

El sitio ya está desplegado y conectado a GitHub (ver "En producción" arriba). Para actualizarlo, basta con hacer commit y push:

```bash
git add -A
git commit -m "mensaje del cambio"
git push
```

Netlify detecta el push a `main` y vuelve a desplegar automáticamente en 1-2 minutos. El progreso se puede ver en el panel del proyecto en [app.netlify.com](https://app.netlify.com) → `stunning-kheer-35ef43` → **Deploys**.

> **Nota sobre visibilidad:** Netlify crea los sitios nuevos como **privados** por defecto. Este ya se puso en público (Project overview → Make public) para que cualquiera pueda verlo. Si se crea un sitio nuevo desde cero, hay que repetir ese paso.

> **Nota sobre formularios:** en sitios nuevos, la "detección de formularios" de Netlify también viene desactivada por defecto y hay que activarla una vez en **Forms → Enable form detection** (ya está activada en este proyecto) para que el formulario de contacto reciba envíos.

## Conectar el dominio propio (kronsolutions.es)

1. En el panel del sitio en Netlify: **Domain settings → Add a domain**.
2. Introduce `kronsolutions.es`.
3. Netlify te dará los registros DNS a configurar (normalmente un registro `A` o `CNAME` hacia Netlify) en el panel de tu proveedor de dominio.
4. Netlify emite el certificado HTTPS automáticamente una vez verificado el DNS (puede tardar hasta 24h en propagarse).

## Formulario de contacto

El formulario ya está conectado a **Netlify Forms** (`data-netlify="true"` en `index.html` + envío AJAX en `js/main.js`) y las notificaciones por email de nuevos leads llegan a **kronsolutions.contacto@gmail.com** (configurado en Forms → Submission notifications). Los envíos también quedan guardados en el panel: Project → **Forms → lead**.

> Solo funciona una vez desplegado en Netlify (no en `localhost` ni en otros hosts). Si en el futuro se cambia de proveedor, sustituir el `fetch('/')` de `js/main.js` por el endpoint del nuevo servicio (Formspree, EmailJS, backend propio, etc.).

## Pendiente

- [ ] Registrar el dominio `kronsolutions.es` y conectarlo en Netlify (ver sección de dominio arriba).
- [ ] Añadir una imagen `og:image` para vistas previas en redes sociales.
- [ ] Considerar renombrar el proyecto en Netlify (actualmente `stunning-kheer-35ef43`) para que coincida con la marca.
