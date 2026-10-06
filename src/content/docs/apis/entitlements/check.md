---
title: POST /v1/entitlements/check
description: Pide una decisión al PDP comercial.
---

Pide una decisión al PDP comercial: ¿este tenant puede consumir este producto, en este scope y con esta cantidad? **Deny-by-default:** todo lo que no sea `200` con `allow: true` es deny.

| Scope | Auth | Idempotente |
| --- | --- | --- |
| `entitlement:check` | Bearer (OAuth2) | Sí, por `correlation_id` |

## Encabezados

| Nombre | Tipo | | Descripción |
| --- | --- | --- | --- |
| `Authorization` | string | requerido | `Bearer <token>` (OAuth2, vida máxima 1 h). Las claves `atk_` llegan con el portal: ver [Claves y entornos](/claves-y-entornos/). |
| `Idempotency-Key` | uuid | requerido | Obligatorio en todo POST con efecto económico. Usa el mismo valor que `correlation_id`. |
| `x-correlator` | string | objetivo CAMARA | Llega con WP-C2; hoy staging no lo procesa. Ver [idempotencia](/conceptos/idempotencia/). |

## Cuerpo

| Campo | Tipo | | Descripción |
| --- | --- | --- | --- |
| `tenant_id` | uuid | requerido | Tenant que consume. Bajo RLS: solo ves tus datos. |
| `product_code` | string | requerido | Producto del catálogo, p. ej. `sms.otp`. Desconocido, gated o deprecado responde `no_subscription`. |
| `scope` | string | requerido | Acción dentro del producto, p. ej. `send`. |
| `quantity` | integer | requerido | Unidades que se van a consumir. |
| `correlation_id` | string | recomendado | Identifica el consumo: un replay responde `409 duplicate_correlation_id`. Es el que usa [`release`](/apis/entitlements/release/). |

## Ejemplo

```bash
curl -X POST https://api.staging.example/v1/entitlements/check \
  -H "Authorization: Bearer $TOKEN" \
  -H "Idempotency-Key: 7f3c9a01-2b8e-4c5d-9f6a-demo00000123" \
  -H "Content-Type: application/json" \
  -d '{
    "tenant_id": "00000000-5e5e-4000-8000-0000a919e001",
    "product_code": "sms.otp",
    "scope": "send",
    "quantity": 1,
    "correlation_id": "7f3c9a01-2b8e-4c5d-9f6a-demo00000123"
  }'
```

## Respuestas

```json title="200 · permitido"
{
  "allow": true,
  "reason": "ok",
  "remaining_quota": 99941,
  "plan_id": "…",
  "price_ref": "…"
}
```

```json title="200 · cuota agotada"
{
  "allow": false,
  "reason": "quota_exceeded",
  "remaining_quota": 0,
  "plan_id": "…",
  "price_ref": "…"
}
```

| Código | Significado |
| --- | --- |
| `200` | `allow` en `true` o `false`, con una [razón del enum cerrado](/conceptos/decisiones/). |
| `400` | Entrada inválida. |
| `401` / `403` | Sin autenticación, o sin el scope `entitlement:check`. |
| `409` | `duplicate_correlation_id`: el consumo ya se decidió. |
| `503` | `pdp_unavailable` con `allow: false`. [Fail-closed](/conceptos/fail-closed/). |

El formato de los errores está en [Errores](/conceptos/errores/).
