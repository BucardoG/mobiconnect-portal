---
title: x-correlator e idempotencia
description: Cómo evitar cobros dobles y cómo seguir un consumo de punta a punta.
---

## Idempotencia

- Todo `POST` con efecto económico lleva un **`Idempotency-Key`**.
- Envía también el **`correlation_id`** en el cuerpo, con el mismo valor: es el que identifica el consumo en el registro de uso y en [`release`](/apis/entitlements/release/).
- Un replay con el mismo `correlation_id` responde **`409 duplicate_correlation_id`**: el consumo nunca se sirve ni se cobra dos veces.

## Cómo leer un `409` tras un reintento

Si reintentas por un timeout y recibes `409 duplicate_correlation_id`, **el primer intento sí se decidió**: si fue un `allow`, quedó medido. No es un deny nuevo. Concilia con tu propio registro antes de volver a servir o de negar el servicio.

:::tip
Genera un identificador nuevo por cada consumo lógico, no por cada intento de red.
:::

## `x-correlator`

:::caution[Objetivo de conformidad, aún no activo]
`x-correlator` llega con la conformidad CAMARA (WP-C2) y se propagará de punta a punta: request → log → registro de uso. Hoy staging no lo procesa.
:::
