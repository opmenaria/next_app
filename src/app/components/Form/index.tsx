import React from 'react';
import { Button, Form, Input, Select, Space } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
interface tabDataType {
    id: number;
    donor: string;
    panels: string[];
    barcode: number;
    sourceData: string;
    date: string;
    amount: number;
    observedBy: string;
    status: string;
  }
  interface EventType {
    type: string;
    content: string;
  }
  interface calDataType {
    date: string | number;
    events: EventType[];
    reminder?: boolean;
  }
  interface FormData {
    columns: any; 
    rowRef: React.MutableRefObject<any>; 
    onSubmit: (respons: { type: any; content: any } | any) => void; 
  }
  const DumyForm= ({ columns, onSubmit, rowRef }:FormData) => {
  return (
  <Form

    {...layout}
    name="nest-messages"
    onFinish={(respons: any) => onSubmit(respons)}
    style={{ maxWidth: 800, marginTop:30 }}
    initialValues={rowRef.current || {}}
  >
    {columns?.map((column: any) =>{
      const tabOptions=['Unable',"Refused", 'Duplicate', 'Insufficient', 'Approved']
      const calOptions=['success','warning', 'error']
      return <Form.Item key={column.key} name={column.key} label={column.title} >
          {column.key=='panels'?
          <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} >
          {tabOptions?.map((item: string) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
          :column.key=='type'?
          <Select
          style={{ width: 300 }}
          placeholder="Select Type"
          dropdownRender={(menu) => (
            <>
              {menu}
              <Space style={{ padding: '0 8px 4px' }}>
              </Space>
            </>
          )}
          options={(calOptions).map((item:string) => ({ label: item, value: item }))}
        />
          :<Input />}
        </Form.Item>
    })}
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
)};

export default DumyForm;