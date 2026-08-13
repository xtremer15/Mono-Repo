# Bug: Multiple `access_token` Query Parameters in Unauthorized Test

## Steps to Reproduce
1. The framework's setup logic (e.g. `@BeforeMethod`) injects a valid `access_token` into the `RequestContext` for all requests.
2. In `LocationTests.java`, the `testCreateFeatureUnauthorized` method attempts to simulate an unauthorized request by adding an invalid token:
   ```java
   requestContext.setQueryParam("access_token", "invalid_token_123");
   ```
3. RestAssured appends the new parameter instead of replacing the existing one.
4. The API request is dispatched with multiple `access_token` query parameters.

## Payload / Request Data
**Request URI:**
```http
https://api.mapbox.com/datasets/v1/{username}/{dataset_id}/features/feature-123?access_token=valid_token...&access_token=invalid_token_123
```
**Parsed Query Parameters:**
```json
{
  "access_token": ["[valid_token...]", "invalid_token_123"]
}
```

## Expected Behavior
The `setQueryParam` (or an overriding equivalent) should replace the existing `access_token` so that only **one** `access_token` containing `invalid_token_123` is sent in the request.

## Actual Behavior
The request is sent with two `access_token` parameters. RestAssured parses this internally as a List/Array of strings (`[valid_token, invalid_token_123]`). While the test passes because Mapbox eventually returns a `401 Unauthorized`, the request structure is malformed and causes internal casting issues (e.g. `ClassCastException` from `ArrayList` to `String` in custom filters).
