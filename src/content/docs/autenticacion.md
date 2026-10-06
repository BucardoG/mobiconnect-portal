---
title: Autenticación
description: OAuth2 client_credentials hoy en staging, y claves atk_ para aplicaciones del portal.
---

## OAuth2 `client_credentials` (disponible en staging)

- El token es un JWT firmado con **ES256** y se valida contra el JWKS del entorno, con issuer y audience fijados.
- Vida máxima: **1 hora**. Pide uno nuevo antes de que venza.
- Envíalo como `Authorization: Bearer <token>`.

## Claves de API `atk_live_` / `atk_test_` (con el portal)

- Para aplicaciones registradas en el portal de developers, según el modelo Partner → Application → ApiKey.
- Llegan con el try-it y la consola del portal, que están en construcción. Ver [Claves y entornos](/claves-y-entornos/).

## Scopes

| Scope | Para qué |
| --- | --- |
| `entitlement:check` | Pedir decisiones al PDP. |
| `entitlement:admin` | Superficie admin: catálogo y suscripciones. |

Deny-by-default: toda ruta exige un scope explícito. Solo `/healthz`, `/readyz` y `/metrics` son públicas. Hay mTLS disponible para quien lo requiera.
