import React from 'react';
import * as modalStyles from './styles.module.css';

const CreateModal = (props) => {
    const { setCreateModal, width, coupons, setCoupons } = props;

    function handleSubmit(e) {
        e.preventDefault();
        console.log("qw", e);
        setCoupons([
            ...coupons, 
            {name: e.target[0].value, percentOff: e.target[1].value, redeemed: false, isActive: true, country: 'ABC'}
        ])
    }

    return (
        <>
            <div className={modalStyles.modalBackdrop}>
                <div className={modalStyles.modal}>

                    {/* Header */}
                    <i className={modalStyles.closeBtn + " fas fa-close"}
                        onClick={() => { setCreateModal(false) }}
                    ></i>
                    <h3 className={modalStyles.modalHeading}>Create Coupon</h3>
                    <div style={{ marginTop: '20px' }}>
                    </div>

                    {width >= 992 ?
                        <>
                            {/* Body */}
                            <form onSubmit={handleSubmit}>
                                <div style={{ marginTop: '30px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <label htmlFor='coupon_name'>Coupon Name: </label>
                                            <input style={{ border: '1px solid', borderRadius: '5px', padding: '10px', minWidth: '200px' }} type="text" id="coupon_name" placeholder='Use only letters and numbers only. No special characters and space' />
                                        </div>
                                        <div>
                                            <label htmlFor='percentage_off'>Percentage Off: </label>
                                            <input style={{ border: '1px solid', borderRadius: '5px', padding: '10px' }} type="number" id="percentage_off" />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                                        <input type="checkbox" id="single_lesson" />
                                        <label htmlFor='single_lesson'>Single Lesson</label>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input type="checkbox" id="multiple" />
                                        <label for="multiple">Multiple redemption per user?</label>
                                    </div>

                                    <div style={{ marginTop: '20px' }}>
                                        <label htmlFor='desc'>Description</label>
                                        <textarea style={{ marginTop: '-5px' }} id="desc" rows="6"></textarea>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
                                    <div onClick={() => setCreateModal(false)} style={{ cursor: 'pointer', borderRadius: '10px', border: '1px solid #9fcce6', padding: '10px 20px' }}>
                                        Cancel
                                    </div>
                                    <button type="submit" style={{ all: 'unset', cursor: 'pointer', backgroundColor: '#9fcce6', borderRadius: '10px', padding: '10px 20px' }}>
                                        Save
                                    </button>
                                </div>
                            </form>
                        </>
                        :
                        <>
                            {/* <SubmitButton onClick={() => { alert("Submit!"); setCreateModal(false) }} /> */}
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default CreateModal;