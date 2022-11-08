import React, {useState} from "react";
import { useDispatch } from "react-redux";
import * as styles from "./styles.module.css";

import graduation_cap from "../../../../assets/icons/graduation-cap-solid.svg";
import class_taken from "../../../../assets/icons/class_learning_from_home_education_icon.svg";
import verified from "../../../../assets/icons/check_checklist_list_mark_ok_icon.svg";
import non_verified from "../../../../assets/icons/close_circled_icon.svg";
import professor from "../../../../assets/icons/professor_icon.svg";
// import up_arrow from '../../../../assets/icons/up-arrow.svg';
import down_arrow from "../../../../assets/icons/down_arrow_icon.svg";
import graph_img from "../../../../assets/icons/temp_graph.png";
import notification from "../../../../assets/icons/bell_mobile ui_notification_icon.svg";

import { getTeacherData } from "../../../../store/actions/teacher/index";
import { getMyCourses } from '../../../../store/actions/course';
import { useWindowDimensions } from "../../../../utils/util";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const TeacherDashboard = (props) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  

  const graphOptions = [
    { name: "Courses Impression", values: "" },
    { name: "Per Session Earning", values: "" },
    { name: "Top Student", values: "" },
  ];

  const [graph, setGraph] = React.useState("Courses Impression");
  const [teacherData, setTeacherData] = React.useState();
  const [courseNumber, setCourseNumber] = React.useState();
  const [verifiedCourse, setVerifiedCourse] = React.useState(0);
  const [unVerifiedCourse, setUnverifiedCourse] = React.useState(0)


  React.useEffect(() => {
    let userObj = JSON.parse(window.localStorage.getItem("profile"));
    if (!userObj.isOnBoarding) {
      toast.warn("Onboarding Pending");
      return history.push("/teacher/onboard");
    }

    async function getMyDetails() {
      try {
        const result = await dispatch(getTeacherData());
        setTeacherData(result);
        localStorage.setItem("teacherData", JSON.stringify(result));


      } catch (e) {
        toast.error("Failed to fetch your details");
        console.log(e);
      }
    }

    async function getCourses () {
  try {
    const result = await dispatch(getMyCourses());
    console.log("courses",result);
    if (result.data) {
      setCourseNumber(result.data.length)

      console.log('item verified courses length',result.data.length);
      var i = 0;
      var j = 0;
      result.data.forEach((item) => {
        console.log('item verified courses', item.course.is_verified);

        if (item.course.is_verified) {
          console.log('value of i is ',i);
          i++;
          setVerifiedCourse(i);
        }
        else {
          console.log('value of j is ',j);
          j++;
          setUnverifiedCourse(j);
        }
      })
    }
  } catch (e) {
    console.log(e)
    toast.error('Failed to fetch your courses')
  }
}
getCourses()

    getMyDetails();
  }, []);

  const widgets = [
  { title: 'Courses', icon: graduation_cap, number: courseNumber },
  { title: 'Class Taken', icon: class_taken, number: 'N/A' },
  { title: 'Verified Courses', icon: verified, number: verifiedCourse },
  { title: 'Non-Verified Courses', icon: non_verified, number: unVerifiedCourse }
]

  
  return (
    <>
      {width >= 992 ? (
        <>
          <main className={styles.mainSection}>
            <TopWidgets width={width} widgets={widgets} />

            <div className={styles.row}>
              <MyEarnings />

              <LessonOverview />

              <MyStudents />
            </div>

            <div className={styles.row}>
              <GraphCard graphOptions={graphOptions} graph={graph} setGraph={setGraph} width={width} />
            </div>
          </main>

          <RightTeacherCard teacherData={teacherData} />
        </>
      ) : (
        <>
          <main className={styles.mainSection}>
            <div style={{ fontSize: "24px", fontWeight: "500", textAlign: "center", padding: "10px 0", border: "1px solid", borderRadius: "10px" }}>
              Welcome {teacherData ? teacherData.firstName.data : "teacher_name"}!
            </div>
            <div style={{ marginTop: "20px", textAlign: "center", fontSize: "21px", fontWeight: "600" }}>Upcoming Class</div>

            <MobileUpcomingCard teacherData={teacherData} />

            <MyEarnings />

            <LessonOverview />

            <MyStudents />

            <div className={styles.row}>
              <GraphCard graphOptions={graphOptions} graph={graph} setGraph={setGraph} width={width} />
            </div>
          </main>
        </>
      )}
    </>
  );
};

const TopWidgets = ({ width, widgets }) => {
  const [activeTab, setActiveTab] = React.useState("Class Taken");

  return (
    <div className={styles.row}>
      {widgets.map((item, index) => (
        <>
          {/* <div className={item.title == activeTab ? styles.firstRowTabActive : styles.firstRowTab} key={index} onClick={() => setActiveTab(item.title)}>
                    <div>
                        {item.title}
                        <div style={{ float: 'right' }}><i class="fas fa-ellipsis-h"></i></div>
                    </div>
                    <div>
                        <img src={item.icon} fill="pink" style={{ width: '30px', filter: 'filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)' }} />
                        <div style={{ float: 'right' }}>{item.number}</div>
                    </div>
                </div> */}
          <div className={styles.firstRowTab} key={index}>
            <div style={{fontSize: width >= 1200 ? '18px' : '14px', backgroundColor: '', display: 'flex', justifyContent: 'space-between'}}>
              {item.title}
              <div style={{ float: "right" }}>
                <i class="fas fa-ellipsis-h"></i>
              </div>
            </div>
            <div>
              <img
                src={item.icon}
                fill="pink"
                style={{ width: "30px", filter: "filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)" }}
              />
              <div style={{ float: "right" }}>{item.number}</div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

const MyEarnings = () => {
  return (
    <div className={styles.myEarnings}>
      <div className={styles.secondRowHeadings}>My Earnings</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          borderTop: "1px solid #359DD6",
          backgroundColor: "#9ECDE6",
        }}
      >
        <div style={{ padding: "10px 0", width: "50%", borderRight: "1px solid #359DD6", display: "flex", justifyContent: "center" }}>
          <div style={{ display: "inline-block" }}>
            <p style={{ color: "#fff", marginBottom: "10px" }}>Today Earning</p>
            <p>N/A</p>
          </div>
        </div>
        <div style={{ padding: "10px 0", width: "50%", display: "flex", justifyContent: "center" }}>
          <div style={{ display: "inline-block" }}>
            <p style={{ color: "#fff", marginBottom: "10px" }}>Pending</p>
            <p>N/A</p>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#FC879E", borderRadius: "0 0 20px 20px", textAlign: "center", padding: "10px 0" }}>
        <div style={{ display: "inline-block", backgroundColor: "#359DD6", color: "#fff", borderRadius: "5px", padding: "5px 20px" }}>Withdraw</div>
      </div>
    </div>
  );
};

const LessonOverview = () => {
  return (
    <div className={styles.lessonOverview}>
      <div className={styles.secondRowHeadings}>Lesson Overview</div>
      <div
        style={{
          border: "1px solid grey",
          borderRadius: "0 0 20px 20px",
          height: "119px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ fontWeight: "bold" }}>Scheduled</div>
          <div style={{ fontWeight: "bold" }}>Upcoming</div>
          <div style={{ fontWeight: "bold" }}>Cancelled</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ fontWeight: "bold" }}>N/A</div>
          <div style={{ fontWeight: "bold" }}>N/A</div>
          <div style={{ fontWeight: "bold" }}>N/A</div>
        </div>
      </div>
    </div>
  );
};

const MyStudents = () => {
  return (
    <div className={styles.myStudents}>
      <div className={styles.secondRowHeadings}>My Students</div>
      <div
        style={{
          border: "1px solid grey",
          borderRadius: "0 0 20px 20px",
          height: "119px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ marginLeft: "10px" }}>
          <img src={professor} style={{ width: "60px" }} />
        </div>
        <div style={{ color: "#359DD6", fontWeight: "bold", textAlign: "center", padding: "10px 0", borderTop: "1px solid #359DD6" }}>
          See all students
        </div>
      </div>
    </div>
  );
};

const GraphCard = ({ graphOptions, graph, setGraph, width }) => {
  return (
    <div
      style={{
        marginTop: width >= 992 ? "0" : "20px",
        padding: width >= 992 ? "20px" : "10px",
        width: "100%",
        borderRadius: "20px",
        border: "1px solid",
      }}
    >
      <div style={{ display: width >= 992 ? "flex" : "block", justifyContent: "space-around", alignItems: "center" }}>
        <div style={{ display: "flex", justifyContent: "space-between", width: width >= 992 ? "70%" : "100%" }}>
          {graphOptions.map((item, index) => (
            <div className={item.name == graph ? styles.graphNameActive : styles.graphName} key={index} onClick={() => setGraph(item.name)}>
              {item.name}
            </div>
          ))}
        </div>
        <div style={{ marginTop: width >= 992 ? "" : "20px", display: width >= 992 ? "" : "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              alignItems: "center",
              padding: "5px 20px",
              border: "1px solid #FC879E",
              borderRadius: "30px",
            }}
          >
            Week
            <img src={down_arrow} style={{ width: "20px" }} />
          </div>
        </div>
      </div>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
        <img src={graph_img} style={{ width: "100%" }} />
      </div>
    </div>
  );
};

const RightTeacherCard = ({ teacherData }) => {
  return (
    <div style={{ width: "20%", position: "absolute", top: "0", right: "25px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "20px",
          margin: "10px",
          width: "20vw",
          minHeight: "97vh",
          backgroundColor: "rgba(158, 205, 230, 0.15)",
          position: "fixed",
        }}
      >
        <div style={{ width: "85%", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <i class="far fa-comment fa-2x"></i>
          <img src={notification} style={{ width: "35px" }} />
        </div>

        <div style={{ width: "85%" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            {teacherData ? (
              <img
                src={teacherData && teacherData.teacherProfilePic.data}
                alt="teacher_img"
                style={{ width: "150px", height: "150px", borderRadius: "50%", border: "3px solid grey" }}
              />
            ) : (
              <i class="fas fa-user-circle fa-9x" style={{ opacity: '0.2', width: "150px", height: "150px", borderRadius: "50%" }}></i>
            )}
          </div>
          <div style={{ textAlign: "center", marginBottom: "20px", fontSize: "20px" }}>
            {`Welcome ${teacherData ? teacherData.firstName.data + " " + teacherData.lastName.data : ""}`}
          </div>
          <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px", marginBottom: "20px" }}>Upcoming Class</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              height: "350px",
              padding: "20px 0",
              marginBottom: "20px",
              color: "#fff",
              backgroundColor: "#9ECDE6",
              width: "100%",
              borderRadius: "20px",
            }}
          >
            {teacherData && teacherData.availability.length !== 0 ?
              <>
                <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '26px' }}>French</div>
                <div style={{ backgroundColor: '#fff', height: '2px', width: '80%' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '30px', idth: '80%', margin: '0 auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className={styles.teacherCardIcons + " far fa-calendar"}></i>
                    14th September 2021
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className={styles.teacherCardIcons + " far fa-clock"}></i>
                    11:00 AM
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className={styles.teacherCardIcons + " fas fa-circle-notch"}></i>
                    60 Minutes
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className={styles.teacherCardIcons + " fas fa-dollar-sign"}></i>
                    $10
                  </div>
                </div>
                <div style={{ fontWeight: 'bold', padding: '10px 25px', borderRadius: '5px', backgroundColor: '#FF0000' }}>Join Class</div>
              </>
              :
              <div style={{ textAlign: "center", fontSize: "20px" }}>No meetings to show</div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileUpcomingCard = ({ teacherData }) => {
  console.log("er", teacherData)
  return (
    <div
      style={{ color: "#fff", marginTop: "20px", backgroundColor: "#9ECDE7", borderRadius: "10px", display: "flex", justifyContent: "space-between" }}
    >
      {teacherData && teacherData.availability.length !== 0 ?
        <>
          <div style={{ marginRight: "10px", borderRight: "2px solid #fff", display: "flex", alignItems: "center" }}>
            <div style={{ transform: "rotate(270deg)" }}>English</div>
          </div>
          <div style={{ fontSize: "16px", padding: "10px 0 0 0" }}>
            <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <i className={styles.studentCardIcons + " far fa-calendar"}></i>
              <span style={{ fontSize: "16px" }}>14th September 2021</span>
            </div>
            <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <i className={styles.studentCardIcons + " far fa-clock"}></i>
              11:00 AM
            </div>
            <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <i className={styles.studentCardIcons + " fas fa-circle-notch"}></i>
              60 Minutes
            </div>
            <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <i className={styles.studentCardIcons + " fas fa-dollar-sign"}></i>
              $10
            </div>
          </div>
          <div style={{ alignSelf: "flex-end", padding: "0 10px 10px 0" }}>
            <div style={{ textAlign: "center", backgroundColor: "#ED224C", borderRadius: "20px", padding: "5px 10px" }}>Join Class</div>
          </div>
        </>
        :
        <div style={{ fontSize: "20px", margin: '0 auto', padding: '20px' }}>No meetings to show</div>
      }
    </div>
  );
};

export default TeacherDashboard;
