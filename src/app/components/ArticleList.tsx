import { gql } from "@apollo/client";
import createApolloClient from "../utilities/ApolloClient";

export async function ArticleList() {
  const client = createApolloClient();
  
  const { data } = await client.query({
    query: gql`
      query listArticles {
        articles {
          id
          name
          author
          content
          tags
        }
      }
    `,
  });

  console.log(`----------Listing articles----------`);
  console.log(data);

  return (
    <div>
      
    </div>
  )
}