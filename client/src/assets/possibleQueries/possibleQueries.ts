import {gql} from "@apollo/client"
export const getPostsQuery = gql`
          query {
                    getPosts {
                    title
                    author
                    description
                    categories
                    date
                  }
          }
      `;

export const getPostByTitleQuery = gql`
  query getPostByTitle($title: String!) {
    getPostByTitle(title: $title) {
      title
      author
      date
      content{
        subheading
        content
      }
    }
  }
`;

export const addPostMutation = gql`
    mutation addPostMutation(
      $title: String!
      $date: String!
      $categories: [String]!
      $author: String!
      $description: String!
      $introduction: String!
      $content: [ContentSubTypeInput]!
    ) {
      addPost(
        title: $title
        date: $date
        categories: $categories
        author: $author
        description: $description
        introduction: $introduction
        content: $content
      ) {
          id
          title
          date
          categories
          author
          description
          introduction
          content {
            subheading
            image
            content
          }
      }
    }
  `;