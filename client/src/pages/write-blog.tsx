import { AiOutlinePlus,AiOutlineMinus } from "react-icons/ai";
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Divider,Select,Upload} from 'antd';
import { useMutation } from '@apollo/client';
import { addPostMutation } from '../assets/possibleQueries/possibleQueries';
import { Option } from 'antd/lib/mentions';
import {  UploadOutlined } from '@ant-design/icons';
import customUploadRequestHandler from '../customFunctions/upload-request-handler';
import Chunk from "../components/write-in-chunks"
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "../components/login";
import { AuthenticationContext } from "../App";



  

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

   
      const isAuthenticated = useContext(AuthenticationContext);
      //if user is not authenticated

      if(!isAuthenticated)
      return <LoginPage/>

      //once user data has been fetched
        const [chunks, setChunks] = useState<{ subheading?: string; content?: string; image?: string }[]>([]);
        const navigate = useNavigate();
        const [addToDatabase, { data, loading, error }] = useMutation(addPostMutation);
        

        const handleAddChunk = () => {
          setChunks([...chunks, {}]);
        };

        const handleRemoveChunk = () => {
          if (chunks.length > 0) {
            const updatedChunks = chunks.slice(0, -1);
            setChunks(updatedChunks);
          }
        };

        const handleChunkChange = (index, changedFields) => {
          setChunks((prevChunks) =>
            prevChunks.map((chunk, i) => (i === index ? { ...chunk, ...changedFields } : chunk))
          );
        };

    //defines what to do once the submit button is clicked
        const onSubmitButtonBeingClicked = (values)=>
        { 

            console.log("Fields From User= ",values.blog);
              const entriesMadeInForm : FormDataType = values.blog;

            //generating SubHeading And Content Array
              const subHeadingAndContentArray: subHeadingAndContentType[] = [];
              for (let i = 0; entriesMadeInForm[`subheading${i}`] && entriesMadeInForm[`content${i}`]; i++) {
              const contentItem = {
                
              subheading: entriesMadeInForm[`subheading${i}`],
              image: entriesMadeInForm[`image${i}`]?.file.response || '', // Replace with image data if you have it
              content: entriesMadeInForm[`content${i}`],
              };
              subHeadingAndContentArray.push(contentItem);
              }
          
              const formData : FormDataType = {
              title: entriesMadeInForm.title,
              date: new Date().toDateString(),
              author: entriesMadeInForm.author,
              description: entriesMadeInForm.description,
              introduction: entriesMadeInForm.introduction,
              categories : entriesMadeInForm.categories,
              content : subHeadingAndContentArray,
              headImage : entriesMadeInForm.headImage?.file.response || '',
              thumbnail : entriesMadeInForm.thumbnail.file.response,
              };


            addToDatabase({variables:formData})
                .then((result) => {
                // Handle the response after the mutation is executed
                console.log("Post added:", result.data.addPost);
                navigate('/posted', { state: { isRedirected: true } })
              })
              .catch((error) => {
            // Handle errors
            // console.error("Error adding post:", error);
          });
      };

      //cross checking that user is authenticated!
      return isAuthenticated && <div className='write-blog-container'>
        
        <Form className='form'
        {...layout}
        name="nest-messages"
        onFinish={onSubmitButtonBeingClicked}
        style={{ maxWidth: 800 }}
        onFinishFailed={() => console.log("it never finished")}
        validateMessages={validateMessages}>
        
          
        <Form.Item name={['blog', 'title']} label="Main Heading" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name={['blog','headImage']} label="headImage" rules={[{ required :true }]}>
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
        
            <Select mode="multiple" placeholder="Please select related categories" maxTagCount={3}>
                <Option value="Technology">Technology</Option>
                <Option value="Travel">Travel</Option>
                <Option value="Life">Life</Option>
                <Option value="Academics">Academics</Option>
                <Option value="Finance">Money</Option>
                <Option value="Science">Science</Option>
                <Option value="History">History</Option>
                <Option value="Culture">Culture</Option>
                <Option value="Story">Story</Option>
                <Option value="Review">Review</Option>
                <Option value="Entertainment">Entertainment</Option>
                <Option value="Personal Growth">Personal Growth</Option>
                <Option value="Nature">Nature</Option>
                <Option value="Career">Career</Option>
           </Select>

        </Form.Item>

        <Form.Item name={['blog','thumbnail']} label="thumbnail" rules={[{ required :true }]}>
          <Upload name="logo" listType="picture" maxCount={1} customRequest={customUploadRequestHandler}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
         </Form.Item> 
        
        

        <Form.Item name={['blog', 'author']} label="author name" rules={[{ required :true }]}>
          <Input />
        </Form.Item>

       <Divider />

            {chunks.map((chunk, index) => (
              <Chunk
                key={index}
                index={index}
                chunk={chunk}
                onChange={handleChunkChange}
              />
            ))}
        
          <Form.Item >
            <Button  type="primary" shape="circle" icon={ <AiOutlinePlus/>} onClick={handleAddChunk} >
              </Button>
          </Form.Item>

          <Form.Item >
            <Button type="primary" shape="circle" icon={ <AiOutlineMinus/>} onClick={handleRemoveChunk} >
              </Button>
          </Form.Item>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          

      </Form>

      
      </div>  
  
};
  
