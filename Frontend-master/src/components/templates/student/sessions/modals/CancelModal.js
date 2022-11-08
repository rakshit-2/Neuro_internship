import React from 'react';
import * as modalStyles from './styles.module.css';

const CancelModal = (props) => {
    const { setCancelModal, width } = props;

    const [page, setPage] = React.useState('1');

    return (
        <>
            <div className={modalStyles.modalBackdrop}>
                <div className={modalStyles.modal}>

                    {/* Header */}
                    <i className={modalStyles.closeBtn + " fas fa-close"}
                        onClick={() => { setCancelModal(false); setPage('1') }}
                    ></i>
                    <h3 className={modalStyles.modalHeading}>Cancel Lesson</h3>
                    <div style={{ marginTop: '20px' }}>
                        {page === '1' ?
                            'Are you sure you want to cancel this lesson?'
                            :
                            "You're about to cancel this lesson."
                        }
                    </div>

                    {width >= 992 ?
                        <>
                            {/* Body */}
                            {page === '1' ?
                                <Page1 setPage={setPage} setCancelModal={setCancelModal} />
                                :
                                <></>
                            }
                            {page === '2' ?
                                <Page2 setCancelModal={setCancelModal} />
                                :
                                <></>
                            }
                        </>
                        :
                        <>
                            {/* <SubmitButton onClick={() => { alert("Submit!"); setCancelModal(false) }} /> */}
                        </>
                    }
                </div>
            </div>
        </>
    )
}

const Page1 = ({ setPage, setCancelModal }) => {

    return (
        <>
            <div style={{ marginTop: '20px' }}>
                <div style={{ padding: '0 20px', textAlign: 'center', width: '50%', display: 'inline-block', borderRight: '1px solid #e2e3e3' }}>
                    <i className={modalStyles.cancelModalCloseIcon + " far fa-times-circle"}></i>
                    <div style={{ height: '80px', marginTop: '30px', textAlign: 'left' }}>
                        Cancelling this lesson will result in a <b>100% refund in Verbling credits.</b> A cancellation <b>cannot be undone</b> and your lesson <b>cannot be scheduled</b> again in the future.
                    </div>
                    <div style={{ borderRadius: '5px', margin: '0 auto', marginTop: '20px', cursor: 'pointer', backgroundColor: '#fc4545', padding: '10px 20px', color: 'white', width: 'fit-content', textAlign: 'center' }}
                        onClick={() => setPage('2')}
                    >
                        Cancel Lesson
                    </div>
                </div>

                <div style={{ padding: '0 20px', textAlign: 'center', width: '50%', display: 'inline-block' }}>
                    <i className={modalStyles.cancelModalReverseIcon + " fas fa-sync"}></i>
                    <div style={{ height: '80px', marginTop: '30px', textAlign: 'left' }}>
                        Or, you can reschedule this lesson for another time.
                    </div>
                    <div style={{ borderRadius: '5px', margin: '0 auto', marginTop: '20px', cursor: 'pointer', backgroundColor: '#0599d0', padding: '10px 20px', color: 'white', width: 'fit-content', textAlign: 'center' }}>
                        Reschedule Lesson
                    </div>
                </div>

                <div style={{ color: '#0599d0', padding: '10px 20px', marginTop: '30px', width: 'fit-content', cursor: 'pointer', borderRadius: '5px', border: '2px solid #0599d0' }}
                    onClick={() => { setCancelModal(false); setPage('1') }}
                >
                    Close
                </div>
            </div>
        </>
    )
}

const Page2 = ({ setCancelModal }) => {
    return (
        <>
            <div style={{ marginTop: '20px' }}>
                <div style={{ padding: '0 20px', textAlign: 'center' }}>
                    <i className={modalStyles.cancelModalCloseIcon + " far fa-times-circle"}></i>
                    <div style={{ marginTop: '30px', textAlign: 'left' }}>
                        <ul>
                            <li>This lesson will be cancelled.</li>
                            <li>will be notified.</li>
                            <li>You will receive a 100% refund in Cerbling credit. Verbling credit is valid for one year.</li>
                        </ul>
                    </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <div style={{ fontSize: '20px' }}>Reason</div>
                    <textarea rows='3'
                        placeholder="Write your reason here"
                    >
                    </textarea>
                </div>

                <div style={{ marginTop: '10px' }}>
                    Are you sure you want to cancel this lesson?
                </div>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ cursor: 'pointer', color: '#0599d0', padding: '8px 20px', width: 'fit-content', borderRadius: '5px', outline: '2px solid #0599d0' }}
                        onClick={() => { setCancelModal(false) }}
                    >
                        Close
                    </div>
                    <div style={{ cursor: 'pointer', color: '#fffefe', padding: '8px 20px', borderRadius: '5px', backgroundColor: '#fd869e' }}
                        onClick={() => alert('Lesson Cancelled!')}
                    >
                        Cancel Lesson
                    </div>
                </div>
            </div>
        </>
    )
}

export default CancelModal;