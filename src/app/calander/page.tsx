"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Badge, BadgeProps, Button, Calendar, CalendarProps, Modal, Popconfirm, Popover, Spin, TableProps, Tag } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import Data from '../clndr.json';

import { BiPlusCircle } from 'react-icons/bi';
import DumyForm from '../components/Form';
import { PiNotePencilLight } from 'react-icons/pi';
import { BsAlarm } from 'react-icons/bs';
interface EventType {
  type: string;
  content: string;
}

interface calDataType {
  date: string | number;
  events?: EventType[];
  reminder?: boolean;
}
export default function CalendarPage() {
  const [value, setValue] = useState<Dayjs>(() => dayjs());
  const [selectedValue, setSelectedValue] = useState<Dayjs>(dayjs());
  const rowRef = useRef<calDataType | null>(null); 
  const [data, setData] = useState<calDataType[] |[]>([]);

  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  function getData(vals: calDataType[]) {
    setLoading(true)
    setTimeout(() => {
      let listData: calDataType[] = vals?.length > 0 ? vals : [];
      setLoading(false);
      setData(listData);
    }, 1500);
  }

  useEffect(() => {
      getData(Data.events);
  }, []);

  const columns: TableProps<calDataType>['columns'] = [
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
      render: (_, {type }:any) => (
        <>
          {type?.map((pan:string, ind:number) => {
            let color = ind ==0 ? 'geekblue': ind ==1?'cyan' : 'red'
            if (pan === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={pan}>
                {pan?.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
     {
        title: 'Content',
      key: 'content',
      dataIndex: 'content',
    },
]
  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  const addReminder = (hasReminder: boolean | undefined) => {
    const currentDate = value.date().toString();
    const newData = data.map((item) => {
      if (item.date == currentDate) {
        return { ...item, reminder: !hasReminder };
      }
      return item;
    });
    setData(newData);
    setOpenModal(false);
    rowRef.current = null;
  };

  const popContent = () => {
    const currentDate = value.date().toString();
    const hasReminder = data.find((el) => el.date == currentDate)?.reminder;
    return (
      <>
        <div className='flex items-center gap-2 cursor-pointer' onClick={() => setOpenModal(true)}>
          <PiNotePencilLight color='blue' size={18} /> Add Event
        </div>
        <Popconfirm
          title="Reminder"
          description={`Want to ${hasReminder ? 'remove' : 'add'} reminder?`}
          onConfirm={() => addReminder(hasReminder)}
          okText="Yes"
          cancelText="No"
          className='flex items-center gap-2 cursor-pointer mt-2'
        >
          <BsAlarm color='blue' size={18} /> {hasReminder ? 'Remove Reminder' : 'Add Reminder'}
        </Popconfirm>
      </>
    );
  };

  const dateCellRender = (val: Dayjs) => {
    const currentDate = val.date();
    const dayData:any = data.find((el) => el.date == currentDate) || { events: [],  date: '',      reminder:false };
    return (
      <div className={`w-auto h-36 border-2 overflow-hidden p-2 ml-1 mt-1 rounded-md ${dayData.reminder ? 'bg-orange-300' : value.date() === val.date() && 'bg-cyan-100'}`}>
        <div className='flex justify-between bg-indigo-100 p-1 items-center rounded-md'>
          <Popover content={popContent} trigger="click">
            <BiPlusCircle />
          </Popover>
          <div>{val.date()}</div>
        </div>
        {dayData?.events?.length > 0 && (
          <ul className='h-24 overflow-y-auto scrollbar-thin' style={{ scrollbarWidth: 'thin' }}>
            {dayData.events.map((item:EventType, index:number) => (
              <li className='flex justify-left w-full' key={index}>
                <Badge status={item.type as BadgeProps['status']} text={item.content} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const onSubmit = (response: EventType) => {
    const currentDate = value.date().toString();
    const newData = data.map((item) => {
      if (item.date == currentDate) {
        return { ...item, events: [...(item.events || []), response] };
      }
      return item;
    });
    if (!data.find((el) => el.date == currentDate)) {
      newData.push({ date: currentDate, events: [response] });
    }
    setData(newData);
    setOpenModal(false);
    rowRef.current = null;
  };

  const monthCellRender = (val: Dayjs) => {
    const monthName = val.format('MMMM');
    return (
      <div className={`w-auto h-36 border-2 overflow-hidden p-2 ml-1 mt-1 rounded-md ${value.month() === val.month() && 'bg-cyan-100'}`}>
        <div className='flex justify-between bg-indigo-100 p-1 items-center rounded-md'>
          <div>{monthName}</div>
        </div>
      </div>
    );
  };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
      };
  return (
    <div className='p-3 z-20'>
      <div className='flex justify-between items-center mb-6 bg-sky-400 p-1 rounded-md'>
        <p className='ml-5 text-2xl'>Calendar</p>
        <div className='flex items-center gap-2'>
            <Button type='primary' onClick={()=>onSelect(dayjs())}>
                Today
            </Button>
        <Alert className=' text-green-700 font-bold' message={`Selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
        </div>
      </div>

      <div className='flex justify-center flex-col'>
        <Spin spinning={loading}>
          <Modal
            title={'Add Event'}
            open={openModal}
            zIndex={1100}
            footer={null}
            onCancel={() => setOpenModal(false)}
            destroyOnClose
          >
            <DumyForm  onSubmit={onSubmit} rowRef={rowRef} columns={columns}  />
          </Modal>
          <Calendar
            className='rounded-lg'
            onSelect={onSelect}
            onPanelChange={onPanelChange}
            value={value}
            fullCellRender={cellRender}
          />
        </Spin>
      </div>
    </div>
  )
}
