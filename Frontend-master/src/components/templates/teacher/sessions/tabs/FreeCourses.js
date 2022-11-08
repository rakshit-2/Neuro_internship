import React from 'react'

import RescheduleModal from '../modals/RescheduleModal'
import AddLessonModal from '../modals/AddLessonModal'

import { Card, CardMobile } from '../commonUtils'

function FreeCourses (props) {
  const { width, arr } = props;
  const [rescheduleModal, setRescheduleModal] = React.useState(false)
  const [addLessonModal, setAddlessonModal] = React.useState(false)

  // const arr = [
  //     { heading: 'Upcoming', time: '8:00 AM', date: 'Tuesday - 7 September, 2021', lang: 'English', duration: '1 hour' },
  //     { heading: 'Upcoming', time: '8:00 AM', date: 'Tuesday - 7 September, 2021', lang: 'English', duration: '1 hour' },
  //     { heading: 'Upcoming', time: '8:00 AM', date: 'Tuesday - 7 September, 2021', lang: 'English', duration: '1 hour' },
  // ]

  // const arrMobile = [
  //     { course: 'Communication Skill 3', isVerified: true, desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
  //     { course: 'Communication Skill 3', isVerified: true, desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
  //     { course: 'Communication Skill 3', isVerified: true, desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
  // ]

  const arrMobile = null

  const dropDownArr = [
    { text: 'Request to Reschedule', modal: setRescheduleModal },
    { text: 'Add Lesson Plan', modal: setAddlessonModal }
  ]

  return (
    <>
      {/* Schedule Modal */}
      {rescheduleModal ? (
        <RescheduleModal
          setRescheduleModal={setRescheduleModal}
          width={width}
        />
      ) : (
        <></>
      )}

      {/* Lesson Modal */}
      {addLessonModal ? (
        <AddLessonModal setAddlessonModal={setAddlessonModal} width={width} />
      ) : (
        <></>
      )}

      {width >= 992 ? (
        <div style={{ marginTop: '50px' }}>
          {arr ? (
            arr.map((item, index) => (
              <Card width={width} cardInfo={item} dropDown={dropDownArr} />
            ))
          ) : (
            <div style={{ textAlign: 'center' }}>No Upcoming Sessions</div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: '30px' }}>
          {arrMobile ? (
            arrMobile.map((item, index) => (
              <CardMobile
                width={width}
                cardInfo={item}
                dropDown={dropDownArr}
              />
            ))
          ) : (
            <div style={{ textAlign: 'center' }}>No Incompleted Sessions</div>
          )}
        </div>
      )}
    </>
  )
}

export default FreeCourses
