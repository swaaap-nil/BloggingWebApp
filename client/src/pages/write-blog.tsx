import React from 'react';
import { Button, Form, Input, InputNumber , Divider} from 'antd';

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
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values: any) => {
  console.log(values);
};

const App: React.FC = () => (

    <Form  className='write-blog-container'
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 800 }}
      validateMessages={validateMessages}>
        
      <Form.Item name={['blog', 'title']} label="Main Heading" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      
      <Form.Item name={['blog', 'introduction ']} label="Introduction Paragraph" rules={[{ required :true }]}>
        <Input.TextArea />
      </Form.Item>

      <Divider />

      <Form.Item name={['blog', 'subheading']} label="Sub Heading" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      
      <Form.Item name={['blog', 'content ']} label="Content Paragraph" rules={[{ required :true }]}>
        <Input.TextArea />
      </Form.Item>

      <Divider />


      
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <Button className="button-color-fix" type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
    </Form>
  
);

export default App;