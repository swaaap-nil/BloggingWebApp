import React from 'react';
import { Form, Input, Upload, Button ,Divider} from 'antd';
import customUploadRequestHandler from '../customFunctions/upload-request-handler';
import ImgCropUpload from './cropUploader';
import {  UploadOutlined } from '@ant-design/icons';
import generateRandomName from '../customFunctions/random-name-generator';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
const Chunk = ({ index, chunk, onChange }) => {
  const handleFormChange = (changedFields) => {
    onChange(index, changedFields);
  };


  const handleImageUpload = (info) => {
    customUploadRequestHandler(info)
    if (info.file.status === 'done') {
      const imageUrl = info.file.response.url; 
      handleFormChange({ image: imageUrl });
    }
  };

  return ( <>
    
      <Form.Item name={[`blog`,`subheading${index}`]} label={`Subheading ${index+1}`}>
        <Input />
      </Form.Item>
      <Form.Item name={[`blog`,`content${index}`]} label={`Content`}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={[`blog`,`image${index}`]} label={`Image`}>
      <ImgCropUpload showGrid showReset rotationSlider aspect ={20/11} name= "image" listType="picture" maxCount={1} action={`${process.env.REACT_APP_IMAGE_API}/post/${generateRandomName()}`}>
              <Button icon={<UploadOutlined />}>Upload image</Button>
          </ImgCropUpload>
      </Form.Item>
      <Divider  />

      </>
  );
};

export default Chunk;
