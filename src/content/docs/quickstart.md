---
title: Quickstart
description: Tu primera decisión del PDP de Entitlements en 3 pasos.
---

Tu primera decisión en 3 pasos, contra staging y con datos sintéticos.

## 1. Obtén un token

OAuth2 `client_credentials`, con el scope `entitlement:check`. El token vive como máximo 1 hora.

```bash
curl -s -X POST https://auth.staging.example/oauth/token \
  -d grant_type=client_credentials \
  -d client_id="$CLIENT_ID" -d client_secret="$CLIENT_SECRET" \
  -d scope=entitlement:check
```

```json
{ "access_token": "eyJ...", "token_type": "Bearer", "expires_in": 3600 }
```

## 2. Pide una decisión

Cada consumo lleva un `Idempotency-Key` y un `correlation_id` con el mismo valor: un replay responde `409` y nunca se cobra dos veces.

```bash
curl -s -X POST https://api.staging.example/v1/entitlements/check \
  -H "Authorization: Bearer $TOKEN" \
  -H "Idempotency-Key: 7f3c9a01-2b8e-4c5d-9f6a-demo00000123" \
  -H "Content-Type: application/json" \
  -d '{ "tenant_id": "00000000-5e5e-4000-8000-0000a919e001",
        "product_code": "sms.otp", "scope": "send", "quantity": 1,
        "correlation_id": "7f3c9a01-2b8e-4c5d-9f6a-demo00000123" }'
```

## 3. Lee la respuesta

Todo lo que no sea `200` con `allow: true` se trata como deny.

```json
{
  "allow": true,
  "reason": "ok",
  "remaining_quota": 99941,
  "plan_id": "…",
  "price_ref": "…"
}
```

:::tip
El tenant del ejemplo es sintético: aparece en los logs de staging y no corresponde a ningún cliente.
:::

Siguiente: la [referencia completa de `check`](/apis/entitlements/check/).
