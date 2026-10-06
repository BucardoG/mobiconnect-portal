---
title: Admin
description: Catálogo y suscripciones. Requiere el scope entitlement:admin.
---

Superficie de administración. Requiere el scope **`entitlement:admin`**.

| Método y ruta | Qué hace | Cuerpo |
| --- | --- | --- |
| `GET /v1/admin/catalog` | Catálogo de productos con sus planes. | — |
| `POST /v1/admin/subscriptions` | Crea una suscripción. | `{tenant_id, plan_id, tier, status?, scope[], valid_until?}` |
| `POST /v1/admin/subscriptions/:id/suspend` | Suspende una suscripción. | `{tenant_id}` |

:::note
Bajo Row Level Security, la suscripción de otro tenant responde `404`, no `403`: no se filtra su existencia.
:::

Crear o suspender una suscripción regenera las filas que el PDP usa para decidir.
