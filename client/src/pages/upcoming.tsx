import React from 'react';
import { Avatar, List } from 'antd';

const data = [
  {
    title : `implement Authentication`
  },
  {
    title : `disable the blue tap bg when clicking the hamburger menu`
  },
  {
    title: `enable resizing in front end`
  },
  {
    title: 'implement sessional storage of images before hitting submit button',
  },
  {
    title: 'implement an interface for the admin to view and approve the posts',
  },
  
  {
    title : 'Allow only authenticated users to write posts'
  },
  {
    title : 'introduce upvotes'
  },
  {
    title : 'introduce comments but only by registered users'
  },
  {
    title : `implement loopCV's form style`
  },
  {
    title : `show preview before adding post`
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