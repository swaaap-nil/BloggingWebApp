import {gql} from "@apollo/client"
export const getPostsQuery = gql`
          query {
                    getPosts {
                    title
                    author
                    description
                    categories
                    date
                    thumbnail
                  }
          }
      `;

export const getPostByTitleQuery = gql`
  query getPostByTitle($title: String!) {
    getPostByTitle(title: $title) {
      title
      author
      date
      headImage
      content{
        subheading
        image
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
      $headImage : String
      $thumbnail : String
      $author: String!
      $description: String!
      $introduction: String!
      $content: [ContentSubTypeInput]!
    ) {
      addPost(
        title: $title
        date: $date
        categories: $categories
        headImage : $headImage
        thumbnail : $thumbnail
        author: $author
        description: $description
        introduction: $introduction
        content: $content
      ) {
          id
          title
          date
          headImage
          thumbnail
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