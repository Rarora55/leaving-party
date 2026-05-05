# Arquitectura Tecnica por Apartados de la Web

## 1. Resumen ejecutivo
La web esta construida como una SPA en React con Vite, orientada a experiencia visual (escenas animadas) y dos flujos de interaccion con datos reales (RSVP y muro de mensajes).  
La arquitectura combina:

- UI por dominios (`home`, `guest-list`, `guest-messages`, `half-mile`)
- configuracion tipada en constantes (`src/shared/constants`)
- servicios de datos desacoplados (`src/services/supabase`, `src/services/localStorage`)
- hooks de caso de uso para orquestar estado/validacion/IO

## 2. Plataforma base (toda la web)
### Tecnologia
- TypeScript 5.9
- React 19 + ReactDOM 19
- Vite 8
- React Router 7
- Tailwind CSS 4
- Motion 12 (`motion/react`)
- Radix Dialog (overlay de navegacion)
- Supabase JS v2

### Arquitectura
- Entrada: `src/main.tsx` -> `src/App.tsx`
- Capa de aplicacion: `src/app/AppRouter.tsx`, `src/app/AppShell.tsx`
- Capa de features por dominio: `src/features/*`
- Capa compartida: `src/shared/*`
- Capa de infraestructura de datos: `src/services/*`

### Patrones aplicados
- `Configuration as code`: rutas, escenas, textos y tokens visuales definidos en constantes tipadas.
- `Container + Presentational`: hooks manejan logica, componentes renderizan.
- `Defensive runtime`: validacion de entorno Supabase y fallback controlado si falta configuracion.

### Soluciones implementadas
- Fallback de rutas con redireccion segura.
- App funcional incluso con Supabase no configurado (degrada features con mensajes controlados).
- Estructura preparada para evolucion por feature sin acoplar paginas entre si.

## 3. Navegacion global y shell
### Tecnologia
- React Router (`BrowserRouter`, `Routes`, `Navigate`, `Link`)
- Radix Dialog para overlay fullscreen

### Arquitectura
- `AppShell` envuelve todas las rutas y monta boton de menu + overlay persistente.
- `PersistentNavigation` renderiza destinos definidos en `navigation.constants.ts`.
- `useNavigationOverlay` centraliza apertura/cierre y lock de scroll del documento.

### Patrones aplicados
- `Single source of truth` para destinos de navegacion.
- `Composable shell`: layout global separado de paginas.
- `A11y-first`: `aria-label`, `aria-current`, `aria-expanded`, manejo de foco y Escape.

### Soluciones implementadas
- Overlay no bloquea navegacion activa (si se pulsa ruta actual, evita navegacion redundante).
- Scroll lock robusto en `body` y `documentElement`.
- Adaptacion de transiciones segun `prefers-reduced-motion`.

## 4. Home (escena principal)
### Tecnologia
- Motion para animacion por scroll
- Assets PNG/WebP por capas (cielo, nubes, suelo, personajes)

### Arquitectura
- `HomeScene` compone capas: cielo, nubes, titulo, footer escenico.
- `useHomeSceneProgress` transforma `scrollYProgress` en subprogresos (`cloudProgress`, `footerProgress`).
- Configuracion declarativa en `HOME_SCENE_CONFIG` (capas, offsets, rangos de animacion, CTA).

### Patrones aplicados
- `Data-driven rendering`: se renderiza por arrays tipados (nubes, capas, personajes).
- `Progressive animation`: transforms derivados de un progreso normalizado (0..1).
- `Reduced motion parity`: se mantiene experiencia equivalente con menor movimiento.

### Soluciones implementadas
- Escena sticky con altura total controlada para narrativa scroll-driven.
- Fallback visual cuando una imagen de capa falla (`HomeFooterLayer`).
- CTA contextual en mobile y desktop con reglas de interactividad por progreso.

## 5. Are You Coming? (RSVP)
### Tecnologia
- React + hooks personalizados
- Supabase tabla `guest_rsvps`
- Edge Function `send-rsvp-notification` para notificacion externa
- localStorage solo para recuperacion temporal de formulario fallido

### Arquitectura
- `GuestListPage` coordina `GuestListForm` + `LatestConfirmations`.
- `useRSVPForm` gestiona ciclo completo: input, validacion, submit, mensajes, persistencia temporal.
- `guestList.api.ts` encapsula operaciones de lectura/escritura en Supabase y notificacion.

### Patrones aplicados
- `Validation before IO`: sanitizacion + validacion local antes de red.
- `Optimistic UI bounded`: prepend de confirmacion en lista local y refresh posterior.
- `Error categorization`: clasificacion de errores Supabase (network/schema/permission/config).

### Soluciones implementadas
- Registro RSVP con estado de notificacion (`pending`, `sent`, `retry_required`).
- Reintento diferido de notificacion mediante estado persistido en base de datos.
- Dedupe de peticiones de "latest confirmations" por limite para evitar llamadas duplicadas.

## 6. Drop a Message / Message Wall
### Tecnologia
- React hooks
- Supabase tabla `guest_messages` + realtime channel
- localStorage para recuperacion de borrador tras fallo

### Arquitectura
- `MessagesPage` separa dos zonas: muro + compositor fijo inferior.
- `useGuestMessageForm` controla validacion/sanitizacion/envio del formulario.
- `useMessageWall` carga mensajes, escucha realtime y mantiene estado del muro.
- `useStickyComposerViewport` compensa teclado movil con `visualViewport`.

### Patrones aplicados
- `Sticky composer layout` con padding dinamico del contenido.
- `Realtime sync`: suscripcion a inserts aprobados para actualizacion en vivo.
- `View-model mapping`: rows de DB -> tarjetas con props de display (rotacion/color).

### Soluciones implementadas
- Compositor expandible/colapsable para mejorar UX movil.
- Muro con estados explicitos: loading, error, empty, loaded.
- Publicacion inmediata en Supabase con auto-aprobacion (sin cola de moderacion por ahora).

## 7. The Half Mile (mapa interactivo)
### Tecnologia
- React + assets de mapa
- Coordenadas tipadas de hotspots en constantes

### Arquitectura
- `HalfMileScene` monta fondo, nubes posicionadas y mapa con capa de hotspots.
- `HalfMileHotspots` administra seleccion de brewery activa y cierre contextual.
- `HalfMileBreweryCard` muestra ficha contextual por `cardPlacement`.

### Patrones aplicados
- `Config-driven interaction`: hotspots definidos por `xPercent/yPercent/radius`.
- `Deterministic randomization`: nubes generadas desde seeds con util dedicada.
- `Accessible interactive map`: botones focusables y cierre por click externo/Escape.

### Soluciones implementadas
- Mapa navegable con puntos de interes y enlace externo por brewery.
- Safe zone para no solapar CTA inferior con nubes.
- Posicionamiento responsivo de hotspots y tarjetas sin dependencias extra.

## 8. Capa de datos e infraestructura
### Tecnologia
- Supabase JS client tipado con contrato `Database`
- Supabase Edge Function (Deno) para enviar emails de RSVP

### Arquitectura
- `shared/config/env.ts` valida variables `VITE_*` y emite diagnostico.
- `services/supabase/client.ts` crea cliente solo cuando la configuracion es valida.
- APIs de dominio (`guestList.api.ts`, `guestMessages.api.ts`) aislan acceso a DB.

### Patrones aplicados
- `Fail-soft startup`: no rompe render global por configuracion incompleta.
- `Service boundary`: componentes nunca llaman Supabase directamente.
- `Log once`: evita ruido de logs repetidos en errores recurrentes.

### Soluciones implementadas
- Separacion entre clave cliente publica (`VITE_SUPABASE_*`) y secretos server-side.
- Notificacion RSVP ejecutada en backend (service role + proveedor email).
- Contratos de migracion/funciones en `supabase/migrations` y `supabase/functions`.

## 9. UI shared, estilos y consistencia
### Tecnologia
- Tailwind CSS 4 con tokens en `@theme inline`
- Componentes base compartidos (`Button`, `Input`, `TextArea`, `PixelCard`, `PageContainer`)

### Arquitectura
- Design tokens globales para color, tipografias y sombras.
- Componentes base reutilizables en todas las paginas para coherencia visual.

### Patrones aplicados
- `Utility-first` con composicion mediante `cn()` (`clsx` + `tailwind-merge`).
- `Variant-based components` (ej. `Button` con `variant` y `size`).

### Soluciones implementadas
- Identidad visual unificada en toda la web.
- Consistencia de estados hover/focus/disabled y radios/shadows.
- Base solida para escalar UI sin duplicar clases complejas.

## 10. Calidad, pruebas y release readiness
### Tecnologia
- Vitest + Testing Library + jsdom
- ESLint + TypeScript build

### Arquitectura de calidad
- Tests organizados por dominio (`tests/guest-list`, `tests/messages`, `tests/half-mile`, `tests/navigation`).
- Suite adicional de release readiness para entorno y metadata/ruteo.

### Patrones aplicados
- `Contract-style tests` para navegacion y UX critica.
- `State coverage` para loading/error/empty/success en paginas clave.

### Soluciones implementadas
- Script de gate completo: `npm run check:release` (`lint` + `test` + `build`).
- Verificacion extra de esquema RSVP con script SQL/Node.
- Cobertura explicita de fallos de configuracion de entorno.

## 11. Conclusion tecnica
La web esta resuelta con una arquitectura modular por feature, fuerte orientacion a configuracion tipada, y limites claros entre UI, logica de caso de uso e infraestructura de datos.  
El resultado es mantenible para iterar en experiencia visual (Home/Half Mile) y robusto para flujos de datos reales (RSVP/Messages) sin comprometer degradacion controlada ni accesibilidad.
