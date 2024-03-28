import { gql, DocumentNode } from "@apollo/client";

interface TestQuery {
  application: {
    candidate_id: string;
  };
}

const TEST: DocumentNode = gql`
  query TestQuery {
    application {
      candidate_id
    }
  }
`;

interface NearTextQuery {
  Resume: {
    application_id: string;
    content: string;
    application_relationship: {
      hiring_manager: string;
      resume_url: string;
    };
  }[];
}

const NEAR_TEXT_RESPONSE: DocumentNode = gql`
  query NearTextQuery($user_query: text!) {
    Resume(where: { vector: { near_text: $user_query } }, limit: 10) {
      application_id
      content
      application_relationship {
        hiring_manager
        resume_url
      }
    }
  }
`;

interface LLMQuery {
  QueryLLM: string;
}

const LLM_QUERY: DocumentNode = gql`
  query LLMQuery($user_query: String!) {
    QueryLLM(user_query: $user_query)
  }
`;

export { NEAR_TEXT_RESPONSE, LLM_QUERY, TEST };
