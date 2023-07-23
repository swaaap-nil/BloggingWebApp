// import { WriteChunk } from '../components/CreateWriteChunkComponentsArray';
import React, { useState } from 'react';
import { Button, Form, Input, Divider,Select} from 'antd';
import {createComponentsArray} from "../components/CreateWriteChunkComponentsArray" 
import { useMutation } from '@apollo/client';
import { addPostMutation } from '../assets/possibleQueries/possibleQueries';
import { Option } from 'antd/lib/mentions';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
};
/* eslint-enable no-template-curly-in-string */

interface ContentItem {
  subheading: string;
  image: string;
  content: string;
}

interface FormData {
  title: string;
  date: string;
  categories: string[];
  author: string;
  description: string;
  introduction: string;
  content: {
    subheading: string;
    image: string;
    content: string;
  }[];
}

export const ThisComponentisResponsibleForWritingBlogs: React.FC = () => {

  const [noOfSubheadings,setChunks]= useState(1)
  const ArrayOfSubheadingComponentsGenerated =  createComponentsArray(noOfSubheadings);
  const [callThisFnToExecuteTheMutation, { data, loading, error }] = useMutation(addPostMutation);

  const oneMoreSubheadingPlease = () => {
    setChunks((prevNoOfChunks) => prevNoOfChunks + 1);
  };

  const oneLessSubheadingPlease = () => {
    setChunks((prevNoOfChunks) => (prevNoOfChunks>1)?prevNoOfChunks-1:prevNoOfChunks);
  };


  //defines what to do once the submit button is clicked
  function onSubmitButtonBeingClicked(values: any)
  {

    const dummyformdata : FormData = {
          title : "asfaasfafssdf",
          date: "ate",
          author: "author",
          description: "description",
          introduction: "troduction",
          categories : ["categoriesArray","asrasf"],
          content : 
          [
            {
              'subheading': 'string',
              "image": "string",
              "content": "string"
            },
          ]
    }
        
        console.log("Fields From User= "+JSON.stringify(values));

        const form : FormData = values.blog
        const categoriesArray : string[] = values.categories

        const contentArray: ContentItem[] = [];
        
        for (let i = 0; form[`title${i}`] && form[`content${i}`]; i++) {
          const contentItem = {
            
          subheading: form[`title${i}`],
          image: "", // Replace with image data if you have it
          content: form[`content${i}`],
          };
          contentArray.push(contentItem);
      }
        const formData :FormData = {
          title: form.title,
          date: form.date,
          author: form.author,
          description: form.description,
          introduction: form.introduction,
          categories : categoriesArray,
          content : contentArray
      };

      console.warn("form data ="+ JSON.stringify(formData))

      callThisFnToExecuteTheMutation({variables:formData})
        .then((result) => {
        // Handle the response after the mutation is executed
        console.log("Post added:", result.data.addPost);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error adding post:", error);
      });
  };
  console.log("eror="+error?.message)
      
  return (<Form className='write-blog-container'
        {...layout}
        name="nest-messages"
        onFinish={onSubmitButtonBeingClicked}
        style={{ maxWidth: 800 }}
        onFinishFailed={() => console.log("it never finished")}
        validateMessages={validateMessages}>
        
          
        <Form.Item name={['blog', 'title']} label="Main Heading" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        
        <Form.Item name={['blog', 'introduction']} label="Introduction Paragraph" rules={[{ required :true }]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item name={['blog', 'description']} label="1 line description" rules={[{ required :true }]}>
          <Input/>
        </Form.Item>

        <Form.Item
          name="categories"
      label="categories"
      rules={[{ required: true, message: 'Please select your favourite colors!', type: 'array' }]}
    >
      <Select mode="multiple" placeholder="Please select favourite colors">
        <Option value="red">Red</Option>
        <Option value="green">Green</Option>
        <Option value="blue">Blue</Option>
      </Select>

    </Form.Item>
        
        <Form.Item name={['blog', 'date']} label="date" rules={[{ required :true }]}>
          <Input />
        </Form.Item>

        <Form.Item name={['blog', 'author']} label="author name" rules={[{ required :true }]}>
          <Input />
        </Form.Item>

        <Divider />

        <div>
        {ArrayOfSubheadingComponentsGenerated.map((Component, index) => (
          <div key={index}>
            <Component/>
          </div>
        ))}
        </div>
        
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button className="button-color-fix" type="primary" onClick={oneMoreSubheadingPlease}>
          ADD
        </Button>
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button className="button-color-fix" type="primary" onClick={oneLessSubheadingPlease}>
          SUB
        </Button>
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button className="button-color-fix" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

      </Form>)
  
};


    
   
     
  export default ThisComponentisResponsibleForWritingBlogs;