---
title: Claves y entornos
description: Entornos test y live, y el modelo de claves de API.
---

## Modelo

Las claves de API siguen el modelo **Partner → Application → ApiKey**, con scopes por clave y una suscripción por detrás. Cada clave pertenece a una aplicación.

## Entornos

| Entorno | Prefijo de clave | Datos | Estado |
| --- | --- | --- | --- |
| Test | `atk_test_` | Tenants sintéticos, sin dinero real | Con el try-it del portal (en construcción) |
| Live | `atk_live_` | Tenants reales | Se habilita con la apertura pública del portal |

Hoy, en staging, la autenticación disponible es [OAuth2 `client_credentials`](/autenticacion/).

## Seguridad de las claves

- Llevan **scopes mínimos**.
- Se guardan como **hash SHA-256**: las verás completas una sola vez, al crearlas. Si se pierden, no se pueden recuperar.
- Son **rotables**. El procedimiento de rotación, con sus plazos, se publicará junto con el try-it.
- Guárdalas en tu gestor de secretos. Nunca en código del navegador ni en un repositorio.
