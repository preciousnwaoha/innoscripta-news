// src/components/DateRangePicker.tsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateRangePicker.css";

interface DateRangePickerProps {
  fromDate: Date | null;
  toDate: Date | null;
  onFromDateChange: (date: Date | null) => void;
  onToDateChange: (date: Date | null) => void;
  className?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  className = "",
}) => {
  return (
    <div className={`date-range-picker ${className}`}>
      <div className="date-picker-field">
        <label htmlFor="from-date">From:</label>
        <DatePicker
          id="from-date"
          selected={fromDate}
          onChange={onFromDateChange}
          selectsStart
          startDate={fromDate}
          endDate={toDate}
          placeholderText="Select start date"
        />
      </div>
      <div className="date-picker-field">
        <label htmlFor="to-date">To:</label>
        <DatePicker
          id="to-date"
          selected={toDate}
          onChange={onToDateChange}
          selectsEnd
          startDate={fromDate}
          endDate={toDate}
        //   minDate={fromDate}
          placeholderText="Select end date"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
