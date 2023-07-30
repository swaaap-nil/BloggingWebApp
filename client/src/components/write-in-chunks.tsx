import React from 'react';
import { Form, Input, Upload, Button ,Divider} from 'antd';
import customUploadRequestHandler from '../customFunctions/upload-request-handler';

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
      const imageUrl = info.file.response.url; // Assuming the API returns the image URL after upload
      handleFormChange({ image: imageUrl });
    }
  };

  return ( <>
    
      <Form.Item name={[`blog`,`subheading${index}`]} label={`subheading${index}`}>
        <Input />
      </Form.Item>
      <Form.Item name={[`blog`,`content${index}`]} label={`content${index}`}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={[`blog`,`image${index}`]} label={`image${index}`}>
        <Upload
             // Replace with your actual API endpoint for image upload
          showUploadList={true}
          customRequest={handleImageUpload}
        >
          <Button>Upload Image</Button>
        </Upload>
      </Form.Item>
      <Divider />
      </>
  );
};

export default Chunk;
