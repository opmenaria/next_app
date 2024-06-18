"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal, Space, Spin, Table,TableProps,Tag } from 'antd';
import Data from '../medi1.json';
import { MdDeleteOutline } from 'react-icons/md';
import { BiEdit, BiPlusCircle } from 'react-icons/bi';
import DumyForm from '../components/Form';

interface tablDataType {
  id:number;
  donor: string;
  panels: string[];
  barcode: number;
  sourceData: string;
  date: string;
  amount: number;
  observedBy: string;
  status: string;
}
export default function TablePage() {
  const rowRef = useRef<tablDataType | null>(null); 
  const [data, setData] = useState<tablDataType[] |[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [opnModl, setOpnModl] = useState<boolean>(false);

  const getData = (vals: tablDataType[]) => {
    setLoading(true)
    setTimeout(() => {
      setData(vals)
    setLoading(false)
    }, 1500);
  }
  useEffect(()=>{
    getData(Data.UsrData)
  },[])

  const handleDelete = (ev: tablDataType) => {
    setLoading(true);
    setTimeout(() => {
      const updatedData = data.filter(dataItem => dataItem.id !== ev.id);
      setData(updatedData);
      setLoading(false);
    }, 1000);
  }
  const handleEdit = (evv: tablDataType) => {
    rowRef.current = evv;
    setOpnModl(true);
  }
  
const columns: TableProps<tablDataType>['columns'] = [
  {
    title: 'Donor',
    fixed: 'left',
    width:200,
    dataIndex: 'donor',
    key: 'donor',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Barcode',
    dataIndex: 'barcode',
    key: 'barcode',
  },
  {
    title: 'Source Data',
    dataIndex: 'sourceData',
    key: 'sourceData',
  },
  {
    title: 'Panels',
    key: 'panels',
    dataIndex: 'panels',
    width: 300,
    render: (_, panels:any) => (
      <>
        {Array.isArray(panels?.panels) ? panels?.panels?.map((panel:string, ind:number) => {
          let color = ind === 0 ? 'geekblue' : ind === 1 ? 'cyan' : 'red';
          if (panel === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={panel}>
              {panel.toUpperCase()}
            </Tag>
          );
        }) : null}
      </>
    ),
  },
  {
    title: 'Amount($)',
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: 'ObservedBy',
    dataIndex: 'observedBy',
    key: 'observedBy',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },

  {
    title: 'Date',
    key: 'date',
    dataIndex: 'date',
  },
  {
    title: 'Actions',
    dataIndex: 'action',
    key: 'action',
    fixed:'right',
    render: (_, itm:any) => (
      <Space size="middle">
        <Button onClick={()=>handleEdit(itm)} icon={<BiEdit size={20} color='blue'/>}/>
        <Button onClick={()=>handleDelete(itm)} icon={<MdDeleteOutline size={20} color='red'/>}/>
      </Space>
    ),
  },
];

  const onSubmit = (formData: tablDataType) => {
    if (rowRef.current) {
      const updatedData = data.map(item => (item.id === rowRef.current?.id ? { ...item, ...formData } : item));
      setData(updatedData);
    } else {
      const newData = [{ ...formData, id: data.length + 1 }, ...data];
      setData(newData);
    }
    setOpnModl(false);
    rowRef.current = null;
  };

  return (
    <div className="p-3 z-20">
      <div className="flex justify-between items-center mb-6 bg-sky-400 p-1 rounded-md">
        <p className="ml-5 text-2xl">Users Table </p>
        <div>
          <Button onClick={() => setOpnModl(true)} icon={<BiPlusCircle size={20} color="blue" />}>
            Add Row
          </Button>
        </div>
      </div>
      <div className="flex justify-center flex-col">
        {data.length === 0 && !loading ? (
          <Spin />
        ) : (
          <Table loading={loading} scroll={{ x: 1300 }} bordered columns={columns} dataSource={data} />
        )}
        <Modal
          title={rowRef.current ? 'Update Row' : 'Create Row'}
          open={opnModl}
          loading={false}
          footer={false}
         onCancel={()=>{rowRef.current = null;setOpnModl(false)}}
          destroyOnClose
        >
          <DumyForm onSubmit={onSubmit} rowRef={rowRef} columns={columns.filter(el=>el.key!='action')}/>
        </Modal>
      </div>
    </div>
  );
}

