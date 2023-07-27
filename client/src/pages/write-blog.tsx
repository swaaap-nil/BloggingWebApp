
import React, { useState } from 'react';
import { Button, Form, Input, Divider,Select,Upload} from 'antd';
import {createComponentsArray} from "../components/subcontent-component" 
import { useMutation } from '@apollo/client';
import { addPostMutation } from '../assets/possibleQueries/possibleQueries';
import { Option } from 'antd/lib/mentions';
import {  UploadOutlined } from '@ant-design/icons';
import customUploadRequestHandler from '../customFunctions/upload-request-handler';
import generateRandomName from '../customFunctions/random-name-generator';




  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
  };
  interface subHeadingAndContentType {
      subheading: string;
      image: string;
      content: string;
  };
  interface FormDataType {

    
        title: string;
        date: string;
        categories: string[];
        author: string;
        description: string;
        introduction: string;
        headImage : any;
        thumbnail : any;
        content: {
          subheading: string;
          image: string;
          content: string;
        }[];
  };
  

  export default function ThisComponentisResponsibleForWritingBlogs(){
  const [noOfSubheadings,setChunks]= useState(1)
  const ArrayOfSubheadingComponentsGenerated =  createComponentsArray(noOfSubheadings);
  const [addToDatabase, { data, loading, error }] = useMutation(addPostMutation);

  const oneMoreSubheadingPlease = () => {
    setChunks((prevNoOfChunks) => prevNoOfChunks + 1);
};

  const oneLessSubheadingPlease = () => {
    setChunks((prevNoOfChunks) => (prevNoOfChunks>1)?prevNoOfChunks-1:prevNoOfChunks);
  };

  //defines what to do once the submit button is clicked
    function onSubmitButtonBeingClicked(values)
    { 

         // console.log("Fields From User= "+JSON.stringify(values.blog));
          const entriesMadeInForm : FormDataType = values.blog;

        //generating SubHeading And Content Array
        const subHeadingAndContentArray: subHeadingAndContentType[] = [];
        for (let i = 0; entriesMadeInForm[`title${i}`] && entriesMadeInForm[`content${i}`]; i++) {
          const contentItem = {
            
          subheading: entriesMadeInForm[`title${i}`],
          image: "isContentImageWorking", // Replace with image data if you have it
          content: entriesMadeInForm[`content${i}`],
          };
          subHeadingAndContentArray.push(contentItem);
      }
       
        const formData : FormDataType = {
          title: entriesMadeInForm.title,
          date: entriesMadeInForm.date,
          author: entriesMadeInForm.author,
          description: entriesMadeInForm.description,
          introduction: entriesMadeInForm.introduction,
          categories : entriesMadeInForm.categories,
          content : subHeadingAndContentArray,
          headImage : entriesMadeInForm.headImage.file.response,
          thumbnail : "isThumbnailWorking",
      };

      // console.warn("form data ="+ JSON.stringify(formData))

      addToDatabase({variables:formData})
        .then((result) => {
        // Handle the response after the mutation is executed
        console.log("Post added:", result.data.addPost);
      })
      .catch((error) => {
        // Handle errors
        // console.error("Error adding post:", error);
      });
  };


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

        <Form.Item name={['blog','headImage']} label="headImage" >
           <Upload name="logo" listType="picture" maxCount={1} customRequest={customUploadRequestHandler}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item> 
        
        <Form.Item name={['blog', 'introduction']} label="Introduction Paragraph" rules={[{ required :true }]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item name={['blog', 'description']} label="1 line description" rules={[{ required :true }]}>
          <Input/>
        </Form.Item>

        <Form.Item
          name={['blog',"categories"]} label="categories" rules={[{ required: true, message: 'Please select related categories', type: 'array' }]}>
        
            <Select mode="multiple" placeholder="Please select related categories">
                <Option value="red">Technology</Option>
                <Option value="green">Travel</Option>
                <Option value="blue">Life</Option>
            </Select>

        </Form.Item>

        <Form.Item name={['blog','thumbnail']} label="thumbnail">
          <Upload name="logo" listType="picture" maxCount={1} >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
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
          
            <Component key={index}/>
         
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

