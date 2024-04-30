import "./calender.css"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { useState } from 'react';


const Calender = ({onClose}) => {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
        <div className="calender-container">
            <button className="calendar-close" onClick={onClose}>❌</button>
            <DateRangePicker
                onChange={item => setState([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={state}
                direction="horizontal"
                minDate={yesterday}
            />;
            <button className="submit-btn" onClick={onClose}>confirm date</button>
        </div>
    )
}

export default Calender