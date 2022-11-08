import React from 'react';

import { Link } from 'react-router-dom';

function PrivateLesson(props) {
    const { width, data } = props;
    
    return (
        <div style={{ marginTop: '10px', width: width >= 992 ? '100%' : '90%' }}>
            <div style={{ borderRadius: '10px 10px 0 0', width: width >= 992 ? '100%' : 'auto', backgroundColor: '#edecec', padding: '10px', fontWeight: 'bold' }}>
                Private
                <br />
                60 min
            </div>
            <div style={{ borderRadius: '0 0 10px 10px', width: width >= 992 ? '100%' : 'auto', backgroundColor: '#fefeff', padding: '10px' }}>
                <div style={{ padding: '10px', borderBottom: '1px solid #edecec', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        1 Lesson
                    </div>
                    <div  style={{ color: '#fe587a' }}>
                        $ {data && data.price.data}/hr
                    </div>
                </div>
                {/* <div style={{ padding: '10px', borderBottom: '1px solid #edecec', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        5 Lessons
                    </div>
                    <div style={{ color: '#fe587a' }}>
                        <span style={{ color: '#82d481' }}>$ 6/hr</span> &nbsp;  $ 7/hr
                    </div>
                </div>
                <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        10 Lessons
                    </div>
                    <div style={{ color: '#fe587a' }}>
                        <span style={{ color: '#82d481' }}>$ 5/hr</span> &nbsp;  $ 7/hr
                    </div>
                </div> */}
                <Link to="/bookCalendar" style={{ textDecoration: 'none' }}>
                    <div style={{ textAlign: 'center', margin: '0 auto', cursor: 'pointer', backgroundColor: '#fe1848', color: '#fefeff', padding: '10px', borderRadius: '5px' }}>
                        Book Now
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default PrivateLesson;