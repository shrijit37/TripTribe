import "./calender.css";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays, format } from 'date-fns'; // Import format function
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDates } from '../../../Redux/searchSlice';

const Calender = ({ onClose }) => {
    const dispatch = useDispatch();
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const confirmDate = () => {
        const { startDate, endDate } = state[0];
        const formattedStartDate = format(startDate, 'dd-MM-yyyy');
        const formattedEndDate = format(endDate, 'dd-MM-yyyy');
        dispatch(setDates({ startDate: formattedStartDate, endDate: formattedEndDate }));
        onClose();
    };

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
            />
            <button className="submit-btn" onClick={confirmDate}>Confirm Date</button>
        </div>
    );
};

export default Calender;
