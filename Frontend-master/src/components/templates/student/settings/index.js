import React from "react";
import * as teacherStyles from '../styles.module.css';
import * as styles from "./styles.module.css";

import BasicInfo from "./basicInfo/basicInfo";
import ProfilePic from "./profilePic/ProfilePic";
import Languages from "./languages/Languages";
import Password from "./password/Password";
import Notifications from "./notifications/Notifications";

const StudentSettings = () => {

  const [activeTab, setActiveTab] = React.useState('Basic Info');

  const tabs = ['Basic Info', 'Profile Pic', 'Languages', 'Password', 'Notifications'];

  const studentData = JSON.parse(localStorage.getItem('studentData'));

  return (
    <>
      <main className={teacherStyles.mainSection}>
        <div className={styles.settingsTabs}>
          {tabs.map((item, index) => (
            <div key={index} className={styles.settingsTab + ' ' + `${activeTab == item ? styles.settingsTabActive : ''}`} onClick={() => { setActiveTab(item) }}>
              {item}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '50px' }}>
          {{
            'Basic Info': <BasicInfo myDetails={studentData.data} />,
            'Profile Pic': <ProfilePic myDetails={studentData.data} />,
            'Languages': <Languages myDetails={studentData.data} />,
            'Password': <Password myDetails={studentData.data} />,
            'Notifications': <Notifications myDetails={studentData.data} />,
          }[activeTab]}
        </div>
      </main>
    </>
  );
};

export default StudentSettings;
