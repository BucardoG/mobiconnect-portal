---
title: POST /v1/entitlements/release
description: Devuelve unidades reservadas que no se pudieron entregar.
---

Compensación para productos en modo `strict`: devuelve unidades que se reservaron con `check` pero no se pudieron entregar aguas abajo. Es idempotente por `correlation_id`.

| Scope | Auth | Idempotente |
| --- | --- | --- |
| `entitlement:check` (por confirmar) | Bearer (OAuth2) | Sí, por `correlation_id` |

## Cuerpo

| Campo | Tipo | | Descripción |
| --- | --- | --- | --- |
| `tenant_id` | uuid | requerido | Tenant dueño de la reserva. |
| `product_code` | string | requerido | Producto de la reserva, p. ej. `did.provision`. |
| `correlation_id` | string | requerido | El mismo del `check` que reservó. |
| `quantity` | integer | requerido | Unidades a devolver. |
| `reason` | string | requerido | `downstream_failed`, `partial_fulfilment` o `cancelled`. |

## Ejemplo

```bash
curl -X POST https://api.staging.example/v1/entitlements/release \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tenant_id": "00000000-5e5e-4000-8000-0000a919e001",
    "product_code": "did.provision",
    "correlation_id": "7f3c9a01-2b8e-4c5d-9f6a-demo00000123",
    "quantity": 2,
    "reason": "downstream_failed"
  }'
```

```json title="200"
{ "released": true, "status": "released", "quantity": 2, "remaining_quota": 99943 }
```

| Código | Significado |
| --- | --- |
| `200` | `status` en `released`, o `already_released` si ya se había devuelto. |
| `404` | `reservation_not_found` (incluye la carrera release-antes-de-commit). |
| `409` | `release_exceeded_reservation` o `release_unsupported_quota_mode` (productos `eventual`). |
