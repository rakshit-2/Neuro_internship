import React from 'react';

import Person from '../../../../../assets/icons/boy_icon.svg';

function Ratings(props) {

    const { width } = props;

    return (
        <div style={{ display: width >= 992 ? '' : 'flex', flexDirection: width >= 992 ? '' : 'column', alignItems: 'center', justifyContent: 'center', marginTop: '10px', borderRadius: '10px', width: width >= 992 ? '100%' : '90%', backgroundColor: '#fefeff', padding: '20px' }}>
            <div style={{ alignSelf: 'flex-start', marginBottom: '10px', fontWeight: 'bold' }}>Ratings</div>
            {/* {[1, 2, 3, 4].map((item, index) => (
                <div style={{ backgroundColor: '#f9f9f8', padding: '10px', margin: '2%', display: width >= 992 ? 'inline-block' : 'flex', flexDirection: 'column', justifyContent: width >= 992 ? 'center' : 'none', width: width >= 992 ? '40%' : '70vw' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <div style={{ backgroundColor: 'green', borderRadius: '50%', width: '40px', height: '40px' }}></div>
                            <div>Fun</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ backgroundColor: 'green', borderRadius: '50%', width: '40px', height: '40px' }}></div>
                            <div>Motivational Guru</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ backgroundColor: 'green', borderRadius: '50%', width: '40px', height: '40px' }}></div>
                            <div>Excellent Materials</div>
                        </div>
                    </div>
                </div>
            ))
            } */}

            <div></div>

            {
                [1, 2, 3, 4, 5].map((item, index) => (
                    <div style={{ borderRadius: '10px', border: '3px solid #f9f9f8', padding: '10px', margin: '2%', display: 'inline-block', width: width >= 992 ? '40%' : '70vw' }}>
                        <div style={{}}>
                            <div>Thankyou for the Lesson!</div>
                            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', justifyCotnent: 'space-between', alignItems: 'center' }}>
                                    <img src={Person} alt="person_img" style={{ marginRight: '5px', width: '30px', height: '30px' }} />
                                    <span>
                                        Yury M
                                        <br />
                                        1 Lesson
                                    </span>
                                </div>
                                <div>
                                    Sep 26, 2021
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div >
    )
}

export default Ratings;