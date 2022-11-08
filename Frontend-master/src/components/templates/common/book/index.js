import React from 'react';
import MyCalendar from '../../student/Calendar/MyCalendar';
import Navigation from '../../../../landing/components/Nav';

function BookScreen(props) {

    const course = JSON.parse(localStorage.getItem("chosenCourse"))

    return (
        <div style={{paddingTop: '100px'}}>
            <div>
                <Navigation />
            </div>
            <MyCalendar teacherData={course.userId.onType} />
        </div>
    )
}

export default BookScreen;