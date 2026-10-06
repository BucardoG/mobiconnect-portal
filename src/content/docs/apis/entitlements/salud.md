---
title: Salud
description: Endpoints públicos de salud y métricas.
---

Son las únicas rutas públicas: no requieren autenticación.

| Ruta | Respuesta medida en staging |
| --- | --- |
| `GET /healthz` | `{"status": "ok"}` |
| `GET /readyz` | `{"status": "ready", "postgres": true, "redis": true}` |
| `GET /metrics` | Métricas Prometheus del servicio. |
