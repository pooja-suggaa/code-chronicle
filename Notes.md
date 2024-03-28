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