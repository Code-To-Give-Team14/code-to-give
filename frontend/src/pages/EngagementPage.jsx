import React from 'react'
import { Tabs } from 'antd';

const EngagementPage = () => {

  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: 'Tab 1',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'Tab 2',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
  ];

  return (
    <div style = {{display:"flex", flexDirection: "column"}}>
      <div style = {{fontsize: "25px", padding: "30px", fontWeight: "bold"}}> Engagement Hub</div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}

export default EngagementPage
