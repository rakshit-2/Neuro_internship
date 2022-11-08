import React from 'react'

import Upcoming from './tabs/Upcoming'
import FreeCourses from './tabs/FreeCourses'
import Cancelled from './tabs/Cancelled'
import Completed from './tabs/Completed'
import Incompleted from './tabs/Incompleted'
import ReportIssue from './tabs/ReportIssue'

import { useWindowDimensions } from '../../../../utils/util'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import * as styles from './styles.module.css'

function TeacherSessions (props) {
  const history = useHistory()
  const { height, width } = useWindowDimensions()

  const [mobileDropdown, setMobileDropdown] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState('Upcoming')

  const tabs = [
    'Upcoming',
    'FreeCourse',
    'Cancelled',
    'Completed',
    'Incompleted',
    'Report Issue'
  ]

  const [upcomingArr, setUpcomingArr] = React.useState()
  const [cancelledArr, setCancelledArr] = React.useState()
  const [completedArr, setCompletedArr] = React.useState()
  const [incompletedArr, setIncompletedArr] = React.useState()
  const [freeCoursesArr, setFreeCoursesArr] = React.useState()

  var data = null

  React.useEffect(() => {
    let userObj = JSON.parse(window.localStorage.getItem('profile'))

    if (!userObj.isOnBoarding) {
      toast.warn('Onboarding Pending')
      return history.push('/teacher/onboard')
    }

    let teacherData = JSON.parse(window.localStorage.getItem('teacherData'))
    if (teacherData.approvalStatus !== 'verified') {
      toast.warn('Admin Verification Pending')
      return history.push('/teacher/dashboard')
    }
    let data = JSON.parse(window.localStorage.getItem('teacherData'))
    // console.log("asd", data.availability);

    var upArr = []
    var caArr = []
    var coArr = []
    var inArr = []
    var frArr = []
    var d = new Date()

    function convertHours (h, m) {
      console.log('hj', h, m)
      var ampm = ''
      ampm = h > 12 ? 'PM' : 'AM'
      h = h % 12
      // h = h.toString().length > 1 ? h : "0" + h;
      m = m.toString().length > 1 ? m : '0' + m
      return `${h}:${m} ${ampm}`
    }

    if (data) {
      for (var i = 0; i < data.availability.length; i++) {
        var slotsArr = data.availability[i].slots
        for (var j = 0; j < slotsArr.length; j++) {
          if (slotsArr[j].booked) {
            console.log('slot booked', slotsArr[j].booked)
            var init_d2 = new Date(slotsArr[j].from)

            var d2 = new Date(
              init_d2.getTime() + init_d2.getTimezoneOffset() * 60000
            ) // final_d2 after converting the timezone

            var day = [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday'
            ][d2.getDay()]
            var month = [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ][d2.getMonth()]
            if (
              slotsArr[j].booked.is_free > 0 &&
              slotsArr[j].to > d.toISOString()
            ) {
              console.log('free trial course');
              frArr.push({
                heading: 'Free Courses',
                time: convertHours(d2.getHours(), d2.getMinutes()),
                date: `${day} - ${d2.getDate()} ${month}, ${d2.getFullYear()}`,
                lang:
                  slotsArr[j].booked.course &&
                  slotsArr[j].booked.course.language.data,
                duration: slotsArr[j].duration
              })
              setFreeCoursesArr(frArr)
            }
            if (slotsArr[j].to > d.toISOString()) {
              console.log('upcoming courses', slotsArr[j])
              upArr.push({
                heading: 'Upcoming',
                time: convertHours(d2.getHours(), d2.getMinutes()),
                date: `${day} - ${d2.getDate()} ${month}, ${d2.getFullYear()}`,
                lang:
                  slotsArr[j].booked.course &&
                  slotsArr[j].booked.course.language.data,
                duration: slotsArr[j].duration
              })

              frArr.push({
                heading: 'Free Courses',
                time: convertHours(d2.getHours(), d2.getMinutes()),
                date: `${day} - ${d2.getDate()} ${month}, ${d2.getFullYear()}`,
                lang:
                  slotsArr[j].booked.course &&
                  slotsArr[j].booked.course.language.data,
                duration: slotsArr[j].duration
              })
              setFreeCoursesArr(frArr);

              setUpcomingArr(upArr);
            } else {
              coArr.push({
                heading: 'Completed',
                time: convertHours(d2.getHours(), d2.getMinutes()),
                date: `${day} - ${d2.getDate()} ${month}, ${d2.getFullYear()}`,
                lang:
                  slotsArr[j].booked.course &&
                  slotsArr[j].booked.course.language.data,
                duration: slotsArr[j].duration + ' min',

                course: 'Communication Skill 3',
                desc:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                isVerified: true
              })
              setCompletedArr(coArr)
            }
          }
        }
      }
    }
  }, [data])

  return (
    <main className={styles.mainSection}>
      {width >= 992 ? (
        <>
          <div className={styles.sessionTabs}>
            {tabs.map((item, index) => (
              <div
                key={index}
                className={
                  styles.sessionTab +
                  ' ' +
                  `${activeTab == item ? styles.sessionTabActive : ''} `
                }
                onClick={() => {
                  setActiveTab(item)
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className={styles.sessionTabs}>
            <div className={styles.sessionTabHeading}>{activeTab}</div>
            <div
              className={styles.arrowIcon}
              onClick={() => setMobileDropdown(!mobileDropdown)}
            >
              {mobileDropdown ? (
                <i class='fas fa-caret-up'></i>
              ) : (
                <i class='fas fa-caret-down'></i>
              )}
            </div>
          </div>
          {mobileDropdown ? (
            <div style={{ position: 'relative' }}>
              <div className={styles.mobileDropdown}>
                {tabs.map((item, index) => (
                  <div
                    key={index}
                    className={
                      styles.sessionTab +
                      ' ' +
                      `${
                        activeTab == item ? styles.sessionTabActiveDropdown : ''
                      } `
                    }
                    onClick={() => {
                      setActiveTab(item)
                      setMobileDropdown(false)
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}

      <div
        className={styles.scrollBarNone}
        style={{
          maxWidth: '800px',
          marginTop: '10px',
          height: '80vh',
          overflowY: 'scroll'
        }}
      >
        {
          {
            Upcoming: <Upcoming width={width} arr={upcomingArr} />,
            FreeCourses: <FreeCourses width={width} arr={freeCoursesArr} />,
            Cancelled: <Cancelled width={width} arr={cancelledArr} />,
            Completed: <Completed width={width} arr={completedArr} />,
            Incompleted: <Incompleted width={width} arr={incompletedArr} />,
            'Report Issue': <ReportIssue width={width} />
          }[activeTab]
        }
      </div>
    </main>
  )
}

export default TeacherSessions
