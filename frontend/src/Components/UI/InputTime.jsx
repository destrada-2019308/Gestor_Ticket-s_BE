import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const onChange = (time, timeString) => {
  console.log(time, timeString);
};


const InputTime = ({name, value, required}) => (
  <TimePicker onChange={onChange} name={name} value={value} required={required} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
);
export default InputTime;