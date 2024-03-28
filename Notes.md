### Setup steps

npx create-next-app code-chronicle
cd code-chronicle
npm i supertokens-node supertokens-auth-react

```ts
query listArticles {
  articles {
    id
    name
    author
    content
    tags
  }
}

mutation addArticle {
  insert_articles(objects: {name: "", author: "", content: "", tags: ""}) {
    returning {
      id
      name
      author
      content
      tags
    }
  }
}

mutation updateArticle {
  update_articles(where: {id: {_eq: 10}}, _set: {author: "Priya", name: "Demo article", content: "Demo content here"}) {
    returning {
      id
      name
      author
      content
      tags
    }
  }
}

mutation deleteArticle {
  delete_articles(where: {id: {_eq: 10}}) {
    returning {
      id
      name
      author
      content
      tags
    }
  }
}

```

<!-- how to authenticate API calls to Hasura using the SuperTokens session -->

Hasura integration with JWT
https://supertokens.com/docs/thirdpartyemailpassword/hasura-integration/with-jwt 

Generate JWT Secret Key:
If you haven't already generated a JWT secret key, you need to generate one. This is a random string that serves as the secret key used to sign and verify JWT tokens. You can generate this key using a tool or library for generating random strings.

```bash
openssl rand -base64 32
```

JWT Secret Key : XbzEVdtapkgRSmFDhKN2Sg7y/TnZ95c2vPhPRPnJYs0=

```ts
// env variable - HASURA_GRAPHQL_JWT_SECRET
// JWT configuration JSON object

{
  "type": "HS256",
  "key": "XbzEVdtapkgRSmFDhKN2Sg7y/TnZ95c2vPhPRPnJYs0=",
  "jwk_url": "http://localhost:3000/api/auth/jwt/jwks.json",
  "claims_namespace": "https://hasura.io/jwt/claims" 
}
// Error parsing TenantConfig: Unable to parse user configuration in vault: Error in $.jwtSecret: key, jwk_url both cannot be present
{
  "type": "HS256",
  "jwk_url": "http://localhost:3000/api/auth/jwt/jwks.json",
  "claims_namespace": "https://hasura.io/jwt/claims" 
}

```

{"type":"RS512", "key": "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDdlatRjRjogo3WojgGHFHYLugd\nUWAY9iR3fy4arWNA1KoS8kVw33cJibXr8bvwUAUparCwlvdbH6dvEOfou0/gCFQs\nHUfQrSDv+MuSUMAe8jzKE4qW+jK+xQU9a03GUnKHkkle+Q0pX/g6jXZ7r1/xAK5D\no2kQ+X5xK9cipRgEKwIDAQAB\n-----END PUBLIC KEY-----\n"}

This appears to be a JSON object representing a public key. The key type is "RS512", which indicates that it uses the RSASSA-PKCS1-v1_5 signature algorithm with SHA-512. The key itself is provided in PEM format, enclosed between "-----BEGIN PUBLIC KEY-----" and "-----END PUBLIC KEY-----" markers.

To generate a public key using the JSON that we have - 
Here's how you can generate a public key from the provided JSON:
Decode the base64 encoded key.
The decoded key is the public key.