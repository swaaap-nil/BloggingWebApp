import React from 'react';
import { Avatar, List } from 'antd';

const data = [
  {
    title: 'introduce verified tag on each post and show posts only which have been verified',
  },
  {
    title: 'implment sessional storage of images before hitting submit button',
  },
  {
    title: 'implmenet an interface for the admin to view and approve the posts',
  },
  {
    title: 'show form submitted sucessfully on successfull submission',
  },
  {
    title : 'Allow only authenticated users to write posts'
  },
  {
    title : 'introduce upvotes'
  },
  {
    title : 'intoduce comments but only by registered users'
  }
];

const Upcoming: React.FC = () => (

  <div>
      <List 
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>
    )}
  />
  </div>
  
);

export default Upcoming;