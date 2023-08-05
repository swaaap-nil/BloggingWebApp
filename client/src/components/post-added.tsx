import React,{useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const PostAdded: React.FC = () => {
  

  const location = useLocation();
  let navigate = useNavigate()
  useEffect(() => {
  
    const isRedirected = location.state?.isRedirected || false;
    console.log('isRedirected:', isRedirected);
    if(!isRedirected){

      navigate('/error-403')

    }
  }, [location]);

  return <div className='post-added-dialog-container'>
  <Result
    status="success"
    title="Successfully Added!"
    subTitle="Blog number: 2017182818828182881 It will be visible once the admin verifies and approves it."
    extra={[
      <Button type="primary" key="console">
        Go To Home
      </Button>,
      <Button key="buy">Write More</Button>,
    ]}
  />
  </div>
};

export default PostAdded;