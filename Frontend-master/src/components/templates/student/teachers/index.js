import React from 'react';
import * as teacherStyles from '../styles.module.css';
import * as styles from './styles.module.css';
import TeacherCard from '../../common/teacherProfile/teacherCard/TeacherCard';

import { useWindowDimensions } from '../../../../utils/util';

function StudentTeachers(props) {

    const { width } = useWindowDimensions();

    const [activeTab, setActiveTab] = React.useState('Favorited');

    const tabs = ['Favorited', 'Current'];

    return (
        <main className={teacherStyles.mainSection}>
            <div className={styles.sessionTabs}>
                {tabs.map((item, index) => (
                    <div key={index} className={styles.sessionTab + ' ' + `${activeTab == item ? styles.sessionTabActive : ''}`} onClick={() => { setActiveTab(item) }}>
                        {item}
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', border: width >=992 ? '1px solid' : '', borderRadius: '10px' }}>
                {/* <TeacherCard width={width} /> */}
            </div>
        </main>
    )
}

export default StudentTeachers;