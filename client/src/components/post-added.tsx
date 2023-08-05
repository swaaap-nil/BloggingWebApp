import React from 'react';
import { Button, Result } from 'antd';

const PostAdded: React.FC = () => (
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
);

export default PostAdded;