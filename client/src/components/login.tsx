import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Result } from 'antd';

const App: React.FC = () => {

  
    const { loginWithRedirect } = useAuth0();

  return <Result
    title="You need to login to be able to write Blogs!"
    extra={
      <Button onClick={() => loginWithRedirect()} type="primary" key="console">
        Login
      </Button>
    }
  />
  };


export default App;