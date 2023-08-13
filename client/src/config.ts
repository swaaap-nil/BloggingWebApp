import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

//Apollo CLient Configuration
const ApolloClientConfig = new ApolloClient({
    uri: `${process.env.REACT_APP_SERVER_API}/graphql`,
    cache: new InMemoryCache(),
  });


  export {ApolloClientConfig};