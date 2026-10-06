---
title: Decisiones del PDP
description: Cómo responde el PDP y qué significa cada razón.
---

El PDP siempre responde `200` con una decisión explícita, salvo error de entrada, de autenticación, de idempotencia o falla del propio PDP.

## Razones (enum cerrado)

| `reason` | `allow` | Significado |
| --- | --- | --- |
| `ok` | `true` | Permitido. La unidad queda medida. |
| `no_subscription` | `false` | El tenant no tiene ese producto. También para productos desconocidos, gated o deprecados. |
| `suspended` | `false` | La suscripción está suspendida. |
| `scope_denied` | `false` | El scope pedido no está en la suscripción. |
| `quota_exceeded` | `false` | Se agotó la cuota del período. |

:::note[La cuota agotada no es un error]
Responde `200 {"allow": false, "reason": "quota_exceeded"}`. El `429` vive solo en el gateway, como límite de transporte (rate limit), nunca como semántica de cuota.
:::

## Cómo tratar la respuesta

Todo lo que no sea `200` con `allow: true` se trata como **deny**. Un `allow: false` es una decisión, no una falla: reintentarlo no lo cambia.
