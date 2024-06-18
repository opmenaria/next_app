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
      <Popconfirm
        title="Reminder"
        description={`Want to ${hasReminder ? 'remove' : 'add'} reminder?`}
        onConfirm={() => addReminder(hasReminder)}
        okText="Yes"
        cancelText="No"
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '0.5rem' }}
      >
        <BsAlarm color='blue' style={{ fontSize: '1.125rem' }} /> {hasReminder ? 'Remove Reminder' : 'Add Reminder'}
      </Popconfirm>
      </>
    );
  };

  const dateCellRender = (val: Dayjs) => {
    const currentDate = val.date();
    const dayData:any = data.find((el) => el.date == currentDate) || { events: [],  date: '',      reminder:false };
    return (
<div style={{ width: 'auto', height: '9rem', border: '2px solid transparent', overflow: 'hidden', padding: '0.5rem', marginLeft: '0.25rem', marginTop: '0.25rem', borderRadius: '0.375rem', backgroundColor: dayData.reminder ? '#f7c97c' : (value.date() === val.date() ? '#cefbff' : '#ebebeb')
}}>
<div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#9d97ff', padding: '0.25rem', alignItems: 'center', borderRadius: '0.375rem' }}>          <Popover content={popContent} trigger="click">
            <BiPlusCircle />
          </Popover>
          <div>{val.date()}</div>
        </div>
        {dayData?.events?.length > 0 && (
  <ul style={{
    height: '6rem',
    overflowY: 'auto',
    scrollbarWidth: 'thin'
  }}>
    {dayData.events.map((item: EventType, index: number) => (
      <li style={{ display: 'flex', justifyContent: 'left', width: '100%' }} key={index}>
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
      <div style={{ width: 'auto', height: '9rem', border: '2px solid', overflow: 'hidden', padding: '0.5rem', marginLeft: '0.25rem', marginTop: '0.25rem', borderRadius: '0.375rem', backgroundColor: value.month() === val.month() ? '#C3DAFE' : 'transparent' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#9d97ff', padding: '0.25rem', alignItems: 'center', borderRadius: '0.375rem' }}>
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
    <div style={{ padding: '0.75rem', zIndex: 20 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', backgroundColor: '#93C5FD', padding: '0.25rem', borderRadius: '0.375rem' }}>
      <p style={{ marginLeft: '1.25rem', fontSize: '1.5rem' }}>Calendar</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button style={{ backgroundColor: '#2563EB', color: '#ffffff', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.375rem' }} onClick={() => onSelect(dayjs())}>
          Today
        </button>
        <div style={{ color: '#059669', fontWeight: '700' }}>Selected date: {selectedValue?.format('YYYY-MM-DD')}</div>
      </div>
    </div>
  

    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
  <Spin spinning={loading}>
    <Modal
      title={'Add Event'}
      open={openModal}
      style={{ zIndex: 1100 }}
      footer={null}
      onCancel={() => setOpenModal(false)}
      destroyOnClose
    >
      <DumyForm onSubmit={onSubmit} rowRef={rowRef} columns={columns} />
    </Modal>
    <Calendar
      style={{ borderRadius: '0.75rem' }}
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
