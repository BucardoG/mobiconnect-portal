---
title: "El contrato: planes y cuotas"
description: Productos, planes, suscripciones y registros de uso en Entitlements.
---

Entitlements es el **PDP comercial** (Policy Decision Point): decide si un consumo está permitido y deja cada unidad autorizada **medida y valorizada**. Entitlements mide y valoriza; no factura. El export de medición firmado hacia el sistema de billing de cada cliente está en diseño.

## Recursos

| Recurso | Qué es | Campos clave |
| --- | --- | --- |
| Producto (`api_products`) | Lo que se puede vender o consumir: live, gated o deprecated. | `product_code` (p. ej. `sms.otp`), `quota_mode` (`strict` / `eventual`), `fail_mode` |
| Plan (`plans`) | La unidad comercial: un producto con límites y modelo de precio. | `rate_limit_rps`, `burst`, `quota_period` (`day` / `month`), `quota_amount`, `price_model`, `price_ref` |
| Suscripción (`subscriptions`) | Lo que un tenant tiene contratado. | `tenant_id`, `plan_id`, `status` (`trial` / `active` / `suspended` / `cancelled`), `valid_from`, `valid_until`, `scope[]` |
| Registro de uso (`usage_records`) | Libro append-only del consumo. | cantidad, unidad, `price_ref` congelado al momento del consumo, `correlation_id` |

## Modos de cuota

- **`strict`:** la unidad se reserva al decidir. Si la entrega falla aguas abajo, se devuelve con [`release`](/apis/entitlements/release/).
- **`eventual`:** el consumo se mide de forma asíncrona; no admite `release`.

## Datos por tenant

Cada tenant solo ve sus propias suscripciones y registros (Row Level Security). Pedir la suscripción de otro tenant responde `404`, no `403`: no se filtra su existencia.
