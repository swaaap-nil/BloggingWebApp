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