import React from 'react';
import * as styles from './styles.module.css';

function NeedScheduling(props) {

    const { width } = props;

    return (
        <>
            {width >= 992 ?
                <div style={{ marginTop: '50px' }}>
                    <div className={styles.cardContainer}>
                        <div style={{ fontWeight: '900', fontSize: '40px' }}>Schedule a Lesson</div>
                        <div style={{ fontWeight: '400', fontSize: '30px' }}>You don't have schedule Lesson. Click below to schedule.</div>
                        <div style={{ cursor: 'pointer', fontWeight: '400', fontSize: '20px', backgroundColor: '#9ECDE7', color: '#fff', borderRadius: '20px', padding: '10px 20px' }}>Shedule a Lesson</div>
                    </div>
                </div>
                :
                <div style={{ marginTop: '30px' }}>
                </div>
            }
        </>
    )
}

export default NeedScheduling;