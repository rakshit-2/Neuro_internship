import React from 'react'
import * as teacherStyles from '../styles.module.css';
import * as styles from "./styles.module.css";

import professor from '../../../../assets/icons/professor_icon.svg';
// import up_arrow from '../../../../assets/icons/up-arrow.svg';
import down_arrow from '../../../../assets/icons/down_arrow_icon.svg';
import graph_img from '../../../../assets/icons/temp_graph.png';
import notification from '../../../../assets/icons/bell_mobile ui_notification_icon.svg';
import classroom from '../../../../assets/images/teacher_type.png';

import { useWindowDimensions } from '../../../../utils/util';

import { getStudentData } from '../../../../store/actions/student/index';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const StudentDashboard = props => {

    const dispatch = useDispatch();
    const { width } = useWindowDimensions();

    const graphOptions = [
        { name: 'Courses Impression', values: '' },
        { name: 'Per Session Earning', values: '' },
        { name: 'Top Student', values: '' }
    ]

    const [graph, setGraph] = React.useState('Courses Impression');

    const [studentData, setStudentData] = React.useState();
    const [profile, setProfile] = React.useState();
    React.useEffect(() => {
        let userProfile = JSON.parse(window.localStorage.getItem("profile"));
        setProfile(userProfile ? userProfile : "");

        async function getMyDetails() {
            try {
                const result = await dispatch(getStudentData(userProfile));
                setStudentData(result);
                localStorage.setItem("studentData", JSON.stringify(result));
            } catch (e) {
                toast.error("Failed to fetch your details");
                console.log(e);
            }
        }
        getMyDetails();
    }, []);

    return (
        <>
            {width >= 992 ?
                <>
                    <main className={teacherStyles.mainSection}>
                        <div style={{ marginBottom: '20px', borderRadius: '20px', padding: '20px', display: 'flex', justifyContent: 'space-between', border: '1px solid' }}>
                            <div style={{ maxWidth: '50%' }}>
                                <div style={{ fontWeight: 'bold', color: '#FD879F', fontSize: '22px', marginBottom: '10px' }}>
                                    {`Welcome ${profile ? profile.fullName : ""}`}
                            
                                </div>
                                <div>Lorem Ipsum is simply a dummy text of printing and typesetting industry.</div>
                            </div>
                            <div>
                                <img src={classroom} alt="img" style={{ width: '60px' }} />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <SessinoOverviewCard />

                            <TeacherCard />

                            <WalletCard />
                        </div>

                        <div className={styles.row}>
                            <GraphCard graphOptions={graphOptions} graph={graph} setGraph={setGraph} width={width} />
                        </div>
                    </main>

                    <RightTeacherCard studentData={studentData} />
                </>
                :
                <>
                    <main className={teacherStyles.mainSection}>
                        <div style={{ fontSize: '24px', fontWeight: '500', textAlign: 'center', padding: '10px 0', border: '1px solid', borderRadius: '10px' }}>Welcome Mayank!</div>
                        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '21px', fontWeight: '600' }}>Upcoming Class</div>

                        <MobileUpcomingCard />

                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                            <SessinoOverviewCard />

                            <WalletCard />
                        </div>

                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                            <ProgressCard />

                            <SessinoOverviewCard />
                        </div>

                        <div className={styles.row}>
                            <GraphCard graphOptions={graphOptions} graph={graph} setGraph={setGraph} width={width} />
                        </div>
                    </main>
                </>
            }
        </>
    )
}

const SessinoOverviewCard = () => {
    return (
        <div className={styles.sessions}>
            <div className={styles.secondRowHeadings}>Sessions Overview</div>
            <div className={styles.secondRowBody}>
                <div>
                    <div>Book Session</div>
                    <div>Upcoming</div>
                </div>
                <div>
                    <div>1</div>
                    <div>2</div>
                </div>
            </div>
        </div>
    )
}

const TeacherCard = () => {
    return (
        <div className={styles.teacher}>
            <div className={styles.secondRowHeadings}>Teacher</div>
            <div className={styles.secondRowBody}>
                <div>
                    <div>Teacher Name</div>
                    <div>(Past Class/ Upcoming)</div>
                </div>
            </div>
        </div>
    )
}

const WalletCard = () => {
    return (
        <div className={styles.wallet}>
            <div className={styles.secondRowHeadings}>Wallet</div>
            <div className={styles.secondRowBody}>
                <div>
                    <div>Available</div>
                    <div>Credits</div>
                </div>
                <div>
                    <div>$50</div>
                    <div>$50</div>
                </div>
            </div>
        </div>
    )
}

const ProgressCard = () => {
    return (
        <div className={styles.sessions}>
            <div className={styles.secondRowHeadings}>Progress</div>
            <div className={styles.secondRowBody}>
                <div>
                    <div>English</div>
                </div>
                <div>
                    <i className={styles.icon + " fas fa-clock"}></i>
                </div>
            </div>
        </div>
    )
}

const GraphCard = ({ graphOptions, graph, setGraph, width }) => {
    return (
        <div style={{ marginTop: width >= 992 ? '0' : '20px', padding: width >= 992 ? '20px' : '10px', width: '100%', borderRadius: '20px', border: '1px solid' }}>
            <div style={{ display: width >= 992 ? 'flex' : 'block', justifyContent: 'space-around', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: width >= 992 ? '70%' : '100%' }}>
                    {graphOptions.map((item, index) => (
                        <div className={item.name === graph ? styles.graphNameActive : styles.graphName} key={index} onClick={() => setGraph(item.name)}>
                            {item.name}
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: width >= 992 ? '' : '20px', display: width >= 992 ? '' : 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center', padding: '5px 20px', border: '1px solid #FC879E', borderRadius: '30px' }}>
                        Week
                        <img src={down_arrow} alt="down_arrow_icon" style={{ width: '20px' }} />
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <img src={graph_img} alt="graph_img" style={{ width: '100%' }} />
            </div>
        </div>
    )
}

const RightTeacherCard = ({ studentData }) => {
    console.log("ssq", studentData)
    return (
        <div style={{ width: '20%', position: 'absolute', top: '0', right: '25px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', borderRadius: '20px', margin: '10px', width: '20vw', minHeight: '97vh', backgroundColor: 'rgba(158, 205, 230, 0.15)', position: 'fixed' }}>
                <div style={{ width: '85%', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <i class="far fa-comment fa-2x"></i>
                    <img src={notification} alt="notification_img" style={{ width: '35px' }} />
                </div>

                <div style={{ width: '85%' }}>
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        {studentData ? (
                            <img
                                src={studentData && studentData.data.profilePic}
                                alt="student"
                                style={{ width: "150px", height: "150px", borderRadius: "50%", border: "3px solid grey" }}
                            />
                        ) : (
                            <i class="fas fa-user-circle fa-9x" style={{ opacity: '0.2', width: "150px", height: "150px", borderRadius: "50%" }}></i>
                        )}
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '20px' }}>
                        {`Welcome ${studentData ? studentData.data.firstName + " " + studentData.data.lastName : ""}`}
                    </div>
                    <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginBottom: '20px' }}>Upcoming Class</div>
                    <div style={{ padding: '20px 0', marginBottom: '20px', color: '#fff', backgroundColor: '#FD879F', width: '100%', borderRadius: '20px' }}>
                        <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '26px' }}>French</div>
                        <div style={{ backgroundColor: '#fff', height: '2px', margin: '20px 20px 30px 20px' }}></div>
                        <div style={{ width: '80%', margin: '0 auto' }}>
                            <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
                                <i className={styles.studentCardIcons + " far fa-calendar"}></i>
                                14th September 2021
                            </div>
                            <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
                                <i className={styles.studentCardIcons + " far fa-clock"}></i>
                                11:00 AM
                            </div>
                            <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
                                <i className={styles.studentCardIcons + " fas fa-circle-notch"}></i>
                                60 Minutes
                            </div>
                            <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
                                <i className={styles.studentCardIcons + " fas fa-dollar-sign"}></i>
                                $10
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ fontWeight: 'bold', padding: '10px 25px', borderRadius: '5px', backgroundColor: '#FF0000' }}>Join Class</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const MobileUpcomingCard = () => {
    return (
        <div style={{ color: '#fff', marginTop: '20px', backgroundColor: '#9ECDE7', borderRadius: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ marginRight: '10px', borderRight: '2px solid #fff', display: 'flex', alignItems: 'center' }}>
                <div style={{ transform: 'rotate(270deg)' }}>English</div>
            </div>
            <div style={{ fontSize: '16px', padding: '10px 0 0 0' }}>
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <i className={styles.studentCardIcons + " far fa-calendar"}></i>
                    <span style={{ fontSize: '16px' }}>14th September 2021</span>
                </div>
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <i className={styles.studentCardIcons + " far fa-clock"}></i>
                    11:00 AM
                </div>
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <i className={styles.studentCardIcons + " fas fa-circle-notch"}></i>
                    60 Minutes
                </div>
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <i className={styles.studentCardIcons + " fas fa-dollar-sign"}></i>
                    $10
                </div>
            </div>
            <div style={{ alignSelf: 'flex-end', padding: '0 10px 10px 0' }}>
                <div style={{ textAlign: 'center', backgroundColor: '#ED224C', borderRadius: '20px', padding: '5px 10px' }}>Join Class</div>
            </div>
        </div>
    )
}

export default StudentDashboard