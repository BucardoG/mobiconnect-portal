---
title: Fail-closed
description: Qué pasa cuando el PDP no puede decidir.
---

Si el PDP no puede decidir (por ejemplo, porque no alcanza su base de datos), **no permite**. Responde con código `503`:

```json
{ "allow": false, "error": "pdp_unavailable" }
```

## Modo de fallo por producto

Cada producto del catálogo declara su `fail_mode`:

| `fail_mode` | Comportamiento |
| --- | --- |
| `closed` | Si no hay decisión, no se sirve. |
| `open_capped` | Abierto con límite: el comportamiento exacto lo define cada producto en el catálogo. |

El `fail_mode` de cada producto se informa en su contrato.

## Qué debe hacer tu integración

- Tratar el `503` como deny: no entregues el servicio.
- Reintentar con backoff exponencial.
- Alertar si el `503` persiste.

Si reintentas con el mismo identificador de correlación, lee [idempotencia](/conceptos/idempotencia/): un `409` significa que el primer intento sí se decidió.
