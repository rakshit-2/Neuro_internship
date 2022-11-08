import React from 'react';

import RescheduleModal from '../modals/RescheduleModal';

import { Card, CardMobile } from '../commonUtils';

function Upcoming(props) {

    const { width, arr } = props;

    const [rescheduleModal, setRescheduleModal] = React.useState(false);

    // const arr = [
    //     { heading: 'Upcoming', time: '8:00 AM', date: 'Tuesday - 7 September, 2021', lang: 'English', duration: '1 hour' },
    //     { heading: 'Upcoming', time: '8:00 AM', date: 'Tuesday - 7 September, 2021', lang: 'English', duration: '1 hour' },
    //     { heading: 'Upcoming', time: '8:00 AM', date: 'Tuesday - 7 September, 2021', lang: 'English', duration: '1 hour' },
    // ]

    const arrMobile = [
        { time: '8:00 PM', date: 'Tuesday - September 14, 2021', ago: '2 months ago', lang: 'Turkish', duration: '60 - Minute Lesson', teacher: 'Seray - Venkat', sessionName: 'Conversational Turkish 1', desc: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen." },
        { time: '8:00 PM', date: 'Tuesday - September 14, 2021', ago: '2 months ago', lang: 'Turkish', duration: '60 - Minute Lesson', teacher: 'Seray - Venkat', sessionName: 'Conversational Turkish 1', desc: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen." },
        { time: '8:00 PM', date: 'Tuesday - September 14, 2021', ago: '2 months ago', lang: 'Turkish', duration: '60 - Minute Lesson', teacher: 'Seray - Venkat', sessionName: 'Conversational Turkish 1', desc: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen." }
    ]

    const dropDownArr = [
        { text: 'Request to Reschedule', modal: setRescheduleModal },
    ]

    return (
        <>
            {/* Schedule Modal */}
            {rescheduleModal ?
                <RescheduleModal setRescheduleModal={setRescheduleModal} width={width} />
                :
                <></>
            }

            {width >= 992 ?
                <div style={{ marginTop: '50px' }}>
                    {arr ?
                        arr.map((item, index) => (
                            <Card
                                width={width}
                                cardInfo={item}
                                dropDown={dropDownArr}
                            />
                        ))
                        :
                        <div style={{ textAlign: 'center' }}>No Upcoming Sessions</div>
                    }
                </div>
                :
                <div style={{ marginTop: '30px' }}>
                    {arr ?
                        arr.map((item, index) => (
                            <CardMobile
                                width={width}
                                cardInfo={item}
                                dropDown={dropDownArr}
                            />
                        ))
                        :
                        <div style={{ textAlign: 'center' }}>No Upcoming Sessions</div>
                    }
                </div>
            }
        </>
    )
}

export default Upcoming;