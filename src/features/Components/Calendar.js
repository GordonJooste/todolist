

export const Calendar = (props) =>{
    
    const {selectedDate, day1, day2, day3, day4, day5} = props;
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


    return(
            <div className='Calendar'>
                <h3> Calendar</h3>
                <div className='column'>
                    <ul>
                    <li className = 'currentDate' key={selectedDate.getDate()}>
                        <h4>{ selectedDate.getDate() }  {selectedDate.toLocaleString('default', { month: 'long' }) }</h4>
                        <article> {weekday[selectedDate.getDay()]} </article>
                    </li>
                    <li key={day1.getDate()}>
                        <article> { day1.getDate() }  { weekday[day1.getDay()]}</article>
                    </li>
                    <li key={day2.getDate()}>
                        <article> { day2.getDate() }  { weekday[day2.getDay()]}</article>
                    </li>
                    <li key={day3.getDate()}>
                        <article> { day3.getDate() }  { weekday[day3.getDay()]}</article>  
                    </li>
                    <li key={day4.getDate()}>
                        <article> { day4.getDate() }  { weekday[day4.getDay()]}</article>  
                    </li>
                    <li key={day5.getDate()}>
                        <article> { day5.getDate() }  { weekday[day5.getDay()]}</article>  
                    </li>
                    </ul>
                    
                </div>
            </div>)

    }