import React from 'react';
import { useWindowDimensions } from '../../../../utils/util';

import * as styles from './styles.module.css';

import CreateModal from './createModal/CreateModal';

function TeacherCoupons(props) {

    const { width } = useWindowDimensions();

    const tableHeader = ['Coupon Name', 'Redeemed', 'Active', 'Percentage Off', 'Country', 'Actions'];

    const [coupons, setCoupons] = React.useState([
        { name: 'Coupon 1', percentOff: '50%', redeemed: false, isActive: true, country: 'ABC' },
        { name: 'Coupon 2', percentOff: '30%', redeemed: false, isActive: true, country: 'ABC' },
        { name: 'Coupon 3', percentOff: '60%', redeemed: true, isActive: true, country: 'ABC' },
        { name: 'Coupon 4', percentOff: '0%', redeemed: true, isActive: true, country: 'ABC' },
        { name: 'Coupon 5', percentOff: '10%', redeemed: true, isActive: false, country: 'ABC' },
        { name: 'Coupon 6', percentOff: '80%', redeemed: false, isActive: true, country: 'ABC' },
        { name: 'Coupon 7', percentOff: '60%', redeemed: false, isActive: false, country: 'ABC' },
        { name: 'Coupon 8', percentOff: '30%', redeemed: false, isActive: true, country: 'ABC' },
        { name: 'Coupon 9', percentOff: '60%', redeemed: true, isActive: true, country: 'ABC' }
    ]);
    const [createModal, setCreateModal] = React.useState(false);

    return (
        <>
            {createModal ?
                <CreateModal setCreateModal={setCreateModal} width={width} coupons={coupons} setCoupons={setCoupons} />
                :
                <></>
            }
            <main className={styles.mainSection}>
                {/* Under Development */}

                <div>
                    <div style={{ width: '100px', color: '#fff', textAlign: 'center', borderRadius: '10px', cursor: 'pointer', padding: '10px 20px', backgroundColor: '#9fcce6' }}
                        onClick={() => setCreateModal(true)}
                    >
                        Create
                    </div>
                </div>

                <table className={styles.tableStyles}>
                    <thead>
                        <tr style={{ fontWeight: 'bold', backgroundColor: '#9fcce6' }}>
                            {tableHeader.map((item, index) => (
                                <th key={index} style={{ padding: '10px 20px', border: '1px solid black' }}>
                                    {item}
                                    <i style={{ color: 'grey', marginLeft: '5px' }} className="fas fa-arrow-down"></i>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {coupons.map((item, index) => (
                            <TableRow item={item} index={index} />
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    )
}

const TableRow = ({ item, index }) => {
    const [showActions, setShowActions] = React.useState(false);

    return (
        <tr key={index} style={{ textAlign: 'center' }}>
            <td style={{ padding: '7px' }}>{item.name}</td>
            <td style={{ padding: '7px' }}>{item.redeemed ? 'Yes' : 'No'}</td>
            <td style={{ padding: '7px' }}>{item.isActive ? 'Yes' : 'No'}</td>
            <td style={{ padding: '7px' }}>{item.percentOff}</td>
            <td style={{ padding: '7px' }}>{item.country}</td>
            <td style={{ padding: '7px' }}>
                <i style={{ cursor: 'pointer' }} class="fas fa-ellipsis-v" onClick={() => setShowActions(!showActions)}></i>
                {showActions ?
                    <div style={{ backgroundColor: '#9fcce6', color: '#fff', textAlign: 'left', border: '1px solid', padding: '10px', borderRadius: '10px', position: 'absolute' }}>
                        <div>Promote</div>
                        <div>Edit</div>
                        <div>Delete</div>
                    </div>
                    :
                    <></>
                }
            </td>
        </tr>
    )
}

export default TeacherCoupons;