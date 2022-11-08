import React from 'react';
import * as styles from './styles.module.css';

import english from '../../../../assets/flags/english.png';

export const SubmitButton = ({ onClick }) => {
    return (
        <div onClick={onClick} style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
            <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px 20px', backgroundColor: '#5bd056', color: '#fffefe', borderRadius: '5px' }}>
                Submit
                <i class="fas fa-check-circle" style={{ fontWeight: 'bold', marginLeft: '10px', color: '#fffefe', }}></i>
            </div>
        </div>
    )
}

export const Card = (props) => {

    const { width, cardInfo, dropDown } = props;

    const [isOpen, setIsopen] = React.useState(false);

    return (
        <>
            <div className={styles.cardContainer}>
                <img src={english} className={styles.cardImg} />
                <div>
                    <h4 className={styles.cardText1}>{cardInfo.heading}</h4>
                    <div style={{ fontSize: '20px' }}>{cardInfo.time}</div>
                    {cardInfo.date}
                </div>
                <div style={{minWidth: '100px'}}>
                    <h4 className={styles.cardText1}>Details</h4>
                    <div style={{ fontSize: '20px' }}>{cardInfo.lang ? cardInfo.lang : 'language'}</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <i class="far fa-clock"></i>
                        <div>{cardInfo.duration}</div>
                    </div>
                </div>

                {dropDown ?
                    <div>
                        <div className={styles.viewButton}
                            onClick={() => setIsopen(!isOpen)}
                        >
                            <div>View</div>
                            {isOpen ?
                                <i style={{ marginLeft: '10px' }} class="fas fa-caret-up"></i>
                                :
                                <i style={{ marginLeft: '10px' }} class="fas fa-caret-down"></i>
                            }
                        </div>
                        {isOpen ?
                        <div style={{position: 'relative'}}>
                            <div className={styles.viewDropdown}>
                                <div style={{position: 'sticky'}}>
                                <div style={{ padding: '10px', borderRadius: '10px 10px 0 0', backgroundColor: '#359cd7', color: '#fffefe' }}>
                                    {dropDown.map((item, index) => (
                                        <div className={styles.dropdownButton} style={{ marginBottom: '10px' }}
                                            onClick={() => { item.modal(true); setIsopen(false) }}>
                                            {item.text}
                                        </div>
                                    ))}
                                </div>

                                <div style={{ padding: '10px', borderRadius: '0 0 10px 10px', display: 'flex', justifyContent: 'space-between', color: '#fffefe', backgroundColor: '#f83030' }}
                                    onClick={() => { alert("Cancel!"); setIsopen(false) }}
                                >
                                    <div className={styles.dropdownButton}>Cancel</div>
                                    <i class="fas fa-trash"></i>
                                </div>
                                </div>
                            </div>
                            </div>
                            :
                            <></>
                        }
                    </div>
                    :
                    <></>
                }
            </div>
        </>
    )
}

export const CardMobile = (props) => {

    const { width, cardInfo, dropDown } = props;

    const [isOpen, setIsopen] = React.useState(false);

    return (
        <>
            <div className={styles.cardMobileContainer} style={{ marginBottom: dropDown ? '' : '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <img src={english} style={{ width: '60px', height: '60px' }} />
                    <div>
                        <div style={{ fontSize: '20px', color: '#359cd7', fontWeight: 'bold' }}>{cardInfo.course}</div>                         <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ fontSize: '18px', color: '#359cd7', fontWeight: 'bold' }}>Status</div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                Verified
                                {cardInfo.isVerified ?
                                    <i class="fas fa-check-circle" style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '10px', color: '#00df76' }}></i>
                                    :
                                    <></>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                    {cardInfo.desc}
                </div>
            </div>

            {dropDown ?
                <div style={{ margin: '-20px 0 20px 0', boxShadow: '10px 10px 20px #aaaaaa', borderRadius: '10px' }}>
                    <div onClick={() => setIsopen(!isOpen)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', borderRadius: '10px', outline: '1px solid #ececee', backgroundColor: '#359cd7' }}>
                        <div style={{ borderRadius: '10px 0 0 10px', textAlign: 'center', color: '#359cd7', backgroundColor: '#fffefe', padding: '10px 20px', width: '90%' }}>View</div>
                        <i style={{ width: '10%', color: '#fff', fontSize: '15px', textAlign: 'center' }} class="fas fa-caret-down"></i>
                    </div>
                    {isOpen ?
                        <div className={styles.viewDropdown}>
                            <div style={{ position: 'absolute', width: '100%' }}>
                                <div style={{ padding: '10px', borderRadius: '10px 10px 0 0', backgroundColor: '#359cd7', color: '#fffefe' }}>
                                    {dropDown.map((item, index) => (
                                        <div className={styles.dropdownButton} style={{ marginBottom: '10px' }}
                                            onClick={() => { item.modal(true); setIsopen(false) }}>
                                            {item.text}
                                        </div>
                                    ))}
                                </div>

                                <div style={{ padding: '10px', borderRadius: '0 0 10px 10px', display: 'flex', justifyContent: 'space-between', color: '#fffefe', backgroundColor: '#f83030' }}
                                    onClick={() => { alert("Cancel!"); setIsopen(false) }}
                                >
                                    <div className={styles.dropdownButton}>Cancel</div>
                                    <i class="fas fa-trash"></i>
                                </div>
                            </div>
                        </div>
                        :
                        <></>
                    }
                </div>
                :
                <></>
            }
        </>
    )
}