import axios from "axios";
import { getSSRSession } from '../sessionUtils';

export async function ArticleList() {
  const { session } = await getSSRSession();

  if (!session) {
    console.log('No session in article list component')
    return <div></div>
  }

  const accessToken = session.getAccessToken();
  console.log(" 🚀-----accessToken in articleList-----", accessToken);

  const data = await axios({
    url: 'https://exciting-kitten-28.hasura.app/v1/graphql',
    method: 'post',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      query: `
        query listArticles {
          articles {
            id
            name
            author
            content
            tags
          }
        }
        `
    })
  })

  console.log('------data-----', data);

  return (
    <div>
      <p>Article list here</p>
      <p>ArticleList access token - {accessToken}</p>
      <p>{JSON.stringify(data.data)}</p>
    </div>
  )
}