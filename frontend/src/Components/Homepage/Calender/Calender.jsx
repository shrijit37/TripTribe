import "./calender.css";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays, format } from 'date-fns';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setDates, setHotel } from '../../../Redux/searchSlice'; // Import setHotel

const Calender = ({ onClose }) => {
    const dispatch = useDispatch();
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);
    const [hotel, setHotelLocal] = useState('');
    const inputRef = useRef(null); // Use a ref to manage the input element

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const confirmDate = () => {
        const { startDate, endDate } = state[0];
        const formattedStartDate = format(startDate, 'dd-MM-yyyy');
        const formattedEndDate = format(endDate, 'dd-MM-yyyy');
        dispatch(setDates({ startDate: formattedStartDate, endDate: formattedEndDate }));
        onClose();
    };

    const onPlaceChanged = (autocomplete) => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            if (place && place.name) {
                const name = place.name;
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                setHotelLocal(name);
                dispatch(setHotel({ name, lat, lng })); // Dispatch name, lat, lng
                console.log(name, lat, lng);
            } else {
                console.error("Autocomplete place object is missing 'name' or 'geometry' property");
            }
        } else {
            console.error('Autocomplete is not loaded yet!');
        }
    };

    useEffect(() => {
        if (!window.google) {
            console.error("Google Maps JavaScript API library must be loaded.");
            return;
        }

        const input = inputRef.current;
        const autocomplete = new window.google.maps.places.Autocomplete(input, { types: ['establishment'] });
        autocomplete.setFields(['name', 'geometry']); // Ensure geometry is included
        autocomplete.addListener('place_changed', () => onPlaceChanged(autocomplete));
    }, []);

    return (
        <div className="calender-container">
            <button className="calendar-close" onClick={onClose}>❌</button>
            <div className="hotel-container">
                <input
                    ref={inputRef}
                    id="hotel-search"
                    type="text"
                    className="hotel-search"
                    placeholder="Select Stay"
                    required
                />
                <button className="submit-btn" onClick={confirmDate}>Search for hotels</button>
            </div>
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
