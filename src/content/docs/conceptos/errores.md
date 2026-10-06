---
title: Errores
description: Formato de error de la API, lo que responde hoy staging y la migración prevista a CAMARA ErrorInfo.
---

## Convención del contrato

Los errores de la API usan un envelope uniforme:

```json
{
  "error": {
    "code": "<código>",
    "message": "<descripción legible>",
    "details": {}
  }
}
```

## Lo que puede responder hoy staging

Algunas rutas todavía devuelven la variante del framework:

```json
{
  "error": "Not Found",
  "message": "Cannot GET /ruta",
  "statusCode": 404,
  "timestamp": "…"
}
```

Lee el código HTTP primero. No dependas de la forma exacta del cuerpo de error hasta la migración descrita abajo.

:::note[Las decisiones no son errores]
`scope_denied`, `quota_exceeded` y las demás razones llegan dentro de una respuesta `200` con `allow: false`. Ver [Decisiones del PDP](/conceptos/decisiones/).
:::

## Códigos HTTP

| Código | Cuándo |
| --- | --- |
| `200` | Decisión entregada, con `allow` en `true` o `false`. |
| `400` | Entrada inválida. |
| `401` / `403` | Sin autenticación, o sin el scope necesario. |
| `404` | Recurso inexistente, o de otro tenant (no se filtra su existencia). |
| `409` | `duplicate_correlation_id`: ese consumo ya se decidió. |
| `503` | `pdp_unavailable`: el PDP no pudo decidir (fail-closed). |

:::note[Migración prevista]
Con la conformidad CAMARA (WP-C2), el formato pasa a **ErrorInfo**: `{"status", "code", "message"}`, y se rechazarán los campos desconocidos en el cuerpo (body estricto). El cambio se anunciará en el [changelog](/recursos/changelog/) con una versión nueva.
:::
