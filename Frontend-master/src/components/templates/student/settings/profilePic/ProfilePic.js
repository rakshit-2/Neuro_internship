import React from 'react';
import * as styles from './styles.module.css';
import * as commonStyles from '../styles.module.css';

import professor from '../../../../../assets/icons/professor_icon.svg';

function ProfilePic(props) {

    const [imgUrl, setImageUrl] = React.useState("");

    const handleFileInput = (e) => {
        if (e.target.files.length > 0) {
            console.log("e.target.files"+e.target.files);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
        }
    };
    
    React.useEffect(() => {
        setImageUrl(props.myDetails.profilePic);
    }, [props.myDetails])

    return (
        <>
            <div className={commonStyles.title}>Profile Pic</div>
            <div className={styles.profilePicContainer}>
                <img src={imgUrl ? imgUrl : professor} alt="" />
                <button>
                    Upload &nbsp; <i className="fas fa-upload"></i>
                    <input
                        type="file"
                        name="teacherProfilePic"
                        onChange={(e) => {
                            handleFileInput(e);
                        }}
                    />
                </button>
            </div>
            <div>
                <div className={styles.guidelines}>
                    <p>Guidelines</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <div>
                            <i style={{ color: 'green' }} class="fas fa-check-circle"></i>
                        </div>
                        <div>
                            Make a strong first impression with a good profile picture
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <div>
                            <i style={{ color: 'green' }} class="fas fa-check-circle"></i>
                        </div>
                        <div>
                            Make sure your picture is clear, professional, and personal
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <div>
                            <i style={{ color: 'red' }} class="fas fa-times-circle"></i>
                        </div>
                        <div>
                            Do not impersonate others
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePic;