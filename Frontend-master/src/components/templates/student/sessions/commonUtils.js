import React from 'react';
import * as styles from './styles.module.css';

import english from '../../../../assets/flags/english.png';
import CancelModal from './modals/CancelModal';

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

    const [cancelModal, setCancelModal] = React.useState(false);

    return (
        <>
            {/* Cancel Modal */}
            {cancelModal ?
                <CancelModal setCancelModal={setCancelModal} width={width} />
                :
                <></>
            }

            <div className={styles.cardContainer}>
                <img src={english} alt="language_flag" className={styles.cardImg} />
                <div>
                    <h4 className={styles.cardText1}>{cardInfo.heading}</h4>
                    <div style={{ fontSize: '20px' }}>{cardInfo.time}</div>
                    {cardInfo.date}
                </div>
                <div>
                    <h4 className={styles.cardText1}>Details</h4>
                    <div style={{ fontSize: '20px' }}>{cardInfo.lang}</div>
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
                            <div className={styles.viewDropdown}>
                                <div style={{ padding: '10px', borderRadius: '10px 10px 0 0', backgroundColor: '#ED224C', color: '#fffefe' }}>
                                    {dropDown.map((item, index) => (
                                        <div className={styles.dropdownButton} style={{ marginBottom: '10px' }}
                                            onClick={() => { item.modal(true); setIsopen(false) }}>
                                            {item.text}
                                        </div>
                                    ))}
                                </div>

                                <div style={{ padding: '10px', borderRadius: '0 0 10px 10px', display: 'flex', justifyContent: 'space-between', color: '#fffefe', backgroundColor: '#f83030' }}
                                    onClick={() => { setCancelModal(true); setIsopen(false) }}
                                >
                                    <div className={styles.dropdownButton}>Cancel</div>
                                    <i class="fas fa-trash"></i>
                                </div>
                            </div>
                            :
                            <></>
                        }
                    </div>
                    :
                    <div className={styles.viewButton}
                        // onClick={() => setIsopen(!isOpen)}
                    >
                        <div>View</div>
                        <i style={{ marginLeft: '10px' }} class="fas fa-caret-down"></i>
                    </div>
                }
            </div>
        </>
    )
}

export const CardMobile = (props) => {

    const { width, cardInfo, dropDown } = props;

    const [isOpen, setIsopen] = React.useState(false);

    const [cancelModal, setCancelModal] = React.useState(false);

    return (
        <>
            {/* Cancel Modal */}
            {cancelModal ?
                <CancelModal setCancelModal={setCancelModal} width={width} />
                :
                <></>
            }

            <div className={styles.cardMobileContainer} style={{ marginBottom: dropDown ? '' : '20px' }}>
                <div style={{ fontWeight: '600', fontSize: '25px' }}>{cardInfo.time}</div>
                <div style={{ fontWeight: '400', fontSize: '16px' }}>{cardInfo.date}</div>
                <div style={{ fontWeight: '400', color: '#AFAEAE', fontSize: '14px' }}>{cardInfo.ago}</div>

                <br />

                <div style={{ fontWeight: '500', fontSize: '16px' }}>Details</div>
                <div style={{ fontWeight: '400', fontSize: '14px' }}>{cardInfo.lang}</div>
                <div style={{ fontWeight: '400', fontSize: '14px' }}>{cardInfo.duration}</div>
                <div style={{ fontWeight: '400', fontSize: '14px', color: '#FD879F' }}>{cardInfo.teacher}</div>

                <br />

                <div style={{ fontWeight: '600', fontSize: '16px' }}>{cardInfo.sessionName}</div>
                <div style={{ fontWeight: '400', fontSize: '13px' }}>{cardInfo.desc}</div>
            </div>

            {dropDown ?
                <div style={{ margin: '-20px 0 20px 0', boxShadow: '10px 10px 20px #aaaaaa', borderRadius: '10px' }}>
                    <div onClick={() => setIsopen(!isOpen)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', borderRadius: '10px', outline: '1px solid #ececee', backgroundColor: '#ED224C' }}>
                        <div style={{ borderRadius: '10px 0 0 10px', textAlign: 'center', color: '#ED224C', backgroundColor: '#fffefe', padding: '10px 20px', width: '90%' }}>View</div>
                        <i style={{ width: '10%', color: '#fff', fontSize: '15px', textAlign: 'center' }} class="fas fa-caret-down"></i>
                    </div>
                    {isOpen ?
                        <div className={styles.viewDropdown}>
                            <div style={{ position: 'absolute', width: '100%' }}>
                                <div style={{ padding: '10px', borderRadius: '10px 10px 0 0', backgroundColor: '#ED224C', color: '#fffefe' }}>
                                    {dropDown.map((item, index) => (
                                        <div className={styles.dropdownButton} style={{ marginBottom: '10px' }}
                                            onClick={() => { item.modal(true); setIsopen(false) }}>
                                            {item.text}
                                        </div>
                                    ))}
                                </div>

                                <div style={{ padding: '10px', borderRadius: '0 0 10px 10px', display: 'flex', justifyContent: 'space-between', color: '#fffefe', backgroundColor: '#f83030' }}
                                    onClick={() => { setCancelModal(true); setIsopen(false) }}
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