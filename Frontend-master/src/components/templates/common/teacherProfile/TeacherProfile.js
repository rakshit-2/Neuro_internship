import React from 'react';

import TeacherCard from './teacherCard/TeacherCard';
import TeacherStats from './teacherStats/TeacherStats';
import AboutMe from './aboutMe/AboutMe';
import TrialLesson from './trialLesson/TrialLesson';
import PrivateLesson from './privateLesson/PrivateLesson';
import TeachingExperties from './teachingExperties/TeachingExperties';
import Ratings from './ratings/Ratings';
import MyCalendar from '../../student/Calendar/MyCalendar';

import Navigation from '../../../../landing/components/Nav';

import { useWindowDimensions } from '../../../../utils/util';

import './teacherProfile.css';

function TeacherProfile() {
    // const {course} = history.location.state;
    const course = JSON.parse(localStorage.getItem("chosenCourse"));
    console.log(course);

    const { width } = useWindowDimensions();

    return (
        <div className="parent-container" style={{ paddingTop: '100px' }}>
            <div>
                <Navigation />
            </div>

            {width >= 992 ?
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 10vw' }}>
                    <div style={{ width: '65%' }}>
                        <TeacherCard course={course} width={width} />

                        <AboutMe width={width} teacherData={course.userId.onType} />

                        <MyCalendar teacherData={course.userId.onType} />

                        <TeachingExperties width={width} teacherData={course.userId.onType} />

                        <Ratings width={width} teacherData={course.userId.onType} />
                    </div>

                    <div style={{ width: '30%', marginLeft: '20px' }}>
                        <TeacherStats width={width} teacherData={course.userId.onType} />

                        <TrialLesson width={width} teacherData={course.userId.onType} />

                        <PrivateLesson width={width} data={course} />
                    </div>
                </div>
                :
                <div style={{ margin: '0 auto', width: '90vw', marginTop: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <TeacherCard course={course} width={width} teacherData={course.userId.onType} />

                    <AboutMe width={width} teacherData={course.userId.onType} />

                    <MyCalendar teacherData={course.userId.onType} />

                    <TeacherStats width={width} teacherData={course.userId.onType} />

                    <TrialLesson width={width} teacherData={course.userId.onType} />

                    <PrivateLesson width={width} data={course} />

                    <TeachingExperties width={width} teacherData={course.userId.onType} />

                    <Ratings width={width} teacherData={course.userId.onType} />
                </div>
            }
        </div>
    )
}

export default TeacherProfile;