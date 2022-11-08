import React from 'react';

import All from './tabs/All';
import Upcoming from './tabs/Upcoming';
import Trial from './tabs/Trial';
import Completed from './tabs/Completed';
import Cancelled from './tabs/Cancelled';
import IssueReported from './tabs/IssueReported';
import NeedScheduling from './needScheduling/NeedScheduling';

import { useWindowDimensions } from '../../../../utils/util';

import * as teacherStyles from '../styles.module.css';
import * as styles from './styles.module.css';

function StudentSessions(props) {

    const { width } = useWindowDimensions();

    const [mobileDropdown, setMobileDropdown] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('All');

    const tabs = ['All', 'Upcoming', 'Trial', 'Completed', 'Cancelled', 'Issue Reported', 'Need Scheduling'];

    const [allArr, setAllArr] = React.useState();
    const [upcomingArr, setUpcomingArr] = React.useState();
    const [trialArr, setTrialArr] = React.useState();
    const [cancelledArr, setCancelledArr] = React.useState();
    const [completedArr, setCompletedArr] = React.useState();
    const [incompletedArr, setIncompletedArr] = React.useState();

    var data = null;

    React.useEffect(() => {
        let data = JSON.parse(window.localStorage.getItem("studentData"));
        console.log("asd", data.data.bookedCourses);

        var alArr = [];
        var upArr = [];
        var trArr = [];
        var coArr = [];
        var caArr = [];
        var d = new Date();

        function convertHours(h, m) {
            console.log("hj", h, m);
            var ampm = '';
            ampm = h > 12 ? "PM" : "AM";
            h = h % 12;
            // h = h.toString().length > 1 ? h : "0" + h;
            m = m.toString().length > 1 ? m : "0" + m;
            return `${h}:${m} ${ampm}`;
        }

        if (data) {
            for (var i = 0; i < data.data.bookedCourses.length; i++) {
                var d2 = new Date(data.data.bookedCourses[i].slotDetails.from)
                // var d2 = new Date(init_d2.getTime() + init_d2.getTimezoneOffset() * 60000); // final_d2 after converting the timezone

                var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d2.getDay()];
                var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][
                    d2.getMonth()
                ];

                if (data.data.bookedCourses[i].slotDetails.to > d.toISOString()) {
                    upArr.push({
                        heading: "Upcoming",
                        time: convertHours(d2.getHours(), d2.getMinutes()),
                        date: `${day} - ${d2.getDate()} ${month}, ${d2.getFullYear()}`,
                        lang: 'Course_lang',
                        duration: '00',
                    });
                    setUpcomingArr(upArr);
                    alArr.push({
                        heading: "Upcoming",
                        time: convertHours(d2.getHours(), d2.getMinutes()),
                        date: `${day} - ${d2.getDate()} ${month}, ${d2.getFullYear()}`,
                        lang: 'Course_lang',
                        duration: '00',
                    });
                    setAllArr(alArr);
                } else {
                    coArr.push({
                        heading: "Completed",
                        time: convertHours(d2.getHours(), d2.getMinutes()),
                        date: `${day} - ${d2.getDate()} ${month}, ${d2.getFullYear()}`,
                        lang: 'Course_lang',
                        duration: '00',

                        course: 'Communication Skill 3',
                        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                        isVerified: true
                    });
                    setCompletedArr(coArr);
                    alArr.push({
                        heading: "Completed",
                        time: convertHours(d2.getHours(), d2.getMinutes()),
                        date: `${day} - ${d2.getDate()} ${month}, ${d2.getFullYear()}`,
                        lang: 'Course_lang',
                        duration: '00',

                        course: 'Communication Skill 3',
                        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                        isVerified: true
                    });
                    setAllArr(alArr);
                }
            }
        }
    }, [data]);

    return (
        <main className={teacherStyles.mainSection}>
            {width >= 992 ?
                <>
                    <div className={styles.sessionTabs}>
                        {tabs.map((item, index) => (
                            <div key={index} className={styles.sessionTab + ' ' + `${activeTab === item ? styles.sessionTabActive : ''}`} onClick={() => { setActiveTab(item) }}>
                                {item}
                            </div>
                        ))}
                    </div>
                </>
                :
                <>
                    <div className={styles.sessionTabs}>
                        <div className={styles.sessionTabHeading}>{activeTab}</div>
                        <div className={styles.arrowIcon}
                            onClick={() => setMobileDropdown(!mobileDropdown)}
                        >
                            {mobileDropdown ?
                                <i class="fas fa-caret-up"></i>
                                :
                                <i class="fas fa-caret-down"></i>
                            }
                        </div>
                    </div>
                    {mobileDropdown ?
                        <div style={{ position: 'relative' }}>
                            <div className={styles.mobileDropdown}>
                                {tabs.map((item, index) => (
                                    <div key={index} className={styles.sessionTab + ' ' + `${activeTab === item ? styles.sessionTabActiveDropdown : ''}`}
                                        onClick={() => { setActiveTab(item); setMobileDropdown(false) }}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        :
                        <></>
                    }
                </>
            }

            {{
                'All': <All width={width} arr={allArr} />,
                'Upcoming': <Upcoming width={width} arr={upcomingArr} />,
                'Trial': <Trial width={width} arr={trialArr} />,
                'Completed': <Completed width={width} arr={completedArr} />,
                'Cancelled': <Cancelled width={width} arr={cancelledArr} />,
                'Issue Reported': <IssueReported width={width} />,
                'Need Scheduling': <NeedScheduling width={width} />
            }[activeTab]}
        </main>
    )
}

export default StudentSessions;