  import React from "react";
  import { Button, Form, Input, Divider} from 'antd';
  import { title } from "process";

  interface WriteChunkProps {
    title: string;
  }

  function WriteChunkComponent(props:WriteChunkProps) {
    const {title} = props;
    return <>
              <Form.Item name={['blog', 'subheading']} label="Sub Heading" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

                <Form.Item name={['blog', 'content ']} label="Content Paragraph" rules={[{required: true}]}>
                  <Input.TextArea/>
                </Form.Item>

                <Divider />
          </>;
  }

  export function createComponentsArray(noofComponentsToBeCreated:number): React.FC[]{
      
      //checking if the no of components to be created is an integer
      if (!Number.isInteger(noofComponentsToBeCreated)) {
        throw new Error("Parameter must be an integer.");
    }
      const componentsArray : React.FC[] = [];
      for(let i = 0; i<noofComponentsToBeCreated;i++){
        const title = `title${i}`;
        componentsArray.push(() => <WriteChunkComponent title={title} />)
      }
      return componentsArray;
  }
    