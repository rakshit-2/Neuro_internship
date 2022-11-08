import React from "react";
import { useHistory } from "react-router-dom";

import "./payment.css";
import student from "../../../../assets/icons/student_man_icon.svg";
// import paypal from "../../../../assets/icons/paypal.png";
import razorpayLogo from "../../../../assets/icons/razorpayLogo.svg";
import { useDispatch } from "react-redux";
import { useWindowDimensions } from "../../../../utils/util";
import { bookSlot } from "../../../../store/actions/student";
import { toast } from "react-toastify";

import { makePayment } from '../../../../store/actions/student/index';

import Navigation from '../../../../landing/components/Nav';

// function to load any script
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

function Payment() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();

    console.log("asd", history.location.state.trail);
    const trail = history.location.state.trail ? history.location.state.trail : false;

    const profile = JSON.parse(localStorage.getItem('profile'))
    const chosenEvent = JSON.parse(localStorage.getItem('chosenEvent'));
    const course = JSON.parse(localStorage.getItem('chosenCourse'));
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    console.log(course);

    const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [freeTrialExists, setFreeTrialExists] = React.useState(false);

    const [slotStart, setSlotStart] = React.useState(new Date(chosenEvent.start));
    const [slotEnd, setSlotEnd] = React.useState(new Date(chosenEvent.end));

    var diffTime = Math.abs(slotEnd - slotStart);
    var diffMin = Math.ceil(diffTime / (1000 * 60))
    console.log("qwe", diffMin);

    const [slotToBookStart, setSlotToBookStart] = React.useState(diffMin === 30 ? slotStart : null);
    const [slotToBookEnd, setSlotToBookEnd] = React.useState(diffMin === 30 ? slotEnd : null);
    const [selectedPlan, setSelectedPlan] = React.useState({});

    var lessonPrices = [];

    if (trail) {

        lessonPrices = [
            { number: "30 Minute Trial Lesson", itemPrice: 0, actual: '$ 0/hrs' }
        ]
    }
    else {
        if (course.price1.data && course.price2.data) {
            lessonPrices = [
                { ...course, number: "1 Lesson", itemPrice: course.price.data, actual: `$${course.price.data}/hr` },
                { ...course, number: "5 Lessons", itemPrice: course.price1.data, actual: `$${course.price1.data}/hr` },
                { ...course, number: "10 Lessons", itemPrice: course.price2.data, actual: `$${course.price2.data}/hr` },
            ];
        } else if (course.price1.data) {
            lessonPrices = [
                { ...course, number: "1 Lesson", itemPrice: course.price.data, actual: `$${course.price.data}/hr` },
                { ...course, number: "5 Lessons", itemPrice: course.price1.data, actual: `$${course.price1.data}/hr` },
            ];
        } else {
            lessonPrices = [
                { ...course, number: "Course Price", itemPrice: course.price.data, actual: `$${course.price.data}/hr` },
            ];
        }

    }
    const obj = `${convertHours(slotStart.getHours(), slotStart.getMinutes())} to 
        ${convertHours(
        addMinutes(slotStart, 30).getHours(),
        addMinutes(slotStart, 30).getMinutes()
    )}`

    const [lesson, setLesson] = React.useState(freeTrialExists ? obj : "");
    // console.log("asd", lesson);

    const [data, setData] = React.useState();

    React.useEffect(() => {
        async function pay() {
            try {
                // Show Loader
                document.getElementById('loader').style.display = 'flex'
                const result = await dispatch(makePayment());
                // Hide Loader
                document.getElementById('loader').style.display = 'none'

                // console.log("mmm", result.data);
                setData(result.data);
            } catch (e) {
                console.log(e);
            }
        }
        pay();
    }, [dispatch])

    //   function to display razorpay modals
    async function displayRazorpay() {
        if (selectedPlan.number) {
            //   razorpay script
            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

            if (!res) {
                toast.error('Razorpay SDK failed to load. Are you online?');
                return
            }

            // const data = await fetch('http://localhost:8080/student/payment/razorpay', { method: 'POST' }).then((t) =>
            //     t.json()
            // )

            //  console.log(data)

            const options = {
                // key: __DEV__ ? 'rzp_test_l7jUPeazfhvrak' : 'rzp_live_RoP27hoIdFtGLV',
                key: 'rzp_live_RoP27hoIdFtGLV',
                // currency: data && data.currency,
                currency: 'USD',
                // amount: data && data.amount,
                amount: selectedPlan.itemPrice * 100,
                // order_id: data && data.id,

                name: selectedPlan.number,
                description: 'Thank you for choosing us',
                image: 'http://localhost:1337/logo.svg',
                handler: function (response) {
                    alert(response.razorpay_payment_id)
                    alert(response.razorpay_order_id)
                    alert(response.razorpay_signature)
                    handleCheckout()
                },
                prefill: {
                    name: profile.fullName,
                    email: profile.email,
                    contact: studentData.data.mobileNumber
                }
            }
            const paymentObject = new window.Razorpay(options)
            paymentObject.open()
        }
    }

    const onCall = (event) => {
        setLesson(event.target.value);
        console.log("ww", event.target.value);
    };

    const handleCheckout = async () => {
        console.log("sadfs", history.location.state.event);
        console.log("chosen event", chosenEvent);
        var currSlot = {
            id: chosenEvent.id,
            title: chosenEvent.title,
            start: chosenEvent.start,
            end: chosenEvent.end
        }
        console.log("currs", currSlot)
        let body = {
            // slot: history.location.state.event,
            // courseId: history.location.state.course._id,
            // teacherId: history.location.state.teacherData._id,
            slot: currSlot,
            courseId: course._id,
            teacherId: course.userId.onType._id
        }
        console.log('body', body)

        try {
            const result = await dispatch(bookSlot(body));
            console.log("result", result);
            if (result.status) {
                toast.success(result.message);
                // displayRazorpay();
                history.push("/find-teacher")
            } else {
                toast.error(result.message);
            }
        } catch (e) {
            console.log(e);
            toast.error("Failed to Book Slot");
        }
    };

    function convertHours(h, m) {
        console.log("hj", h, m);
        var ampm = '';
        ampm = h > 12 ? "PM" : "AM";
        h = h % 12;
        // h = h.toString().length > 1 ? h : "0" + h;
        m = m.toString().length > 1 ? m : "0" + m;
        return `${h}:${m} ${ampm}`;
    }

    function addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }

    function selectSlot(e) {
        if (e.target.id === 'halfhourlesson1') {
            setSlotToBookStart(slotStart);
            setSlotToBookEnd(addMinutes(slotEnd, -30));
            console.log('slot end', addMinutes(slotEnd, -30)
            );

        }
        else {
            setSlotToBookStart(addMinutes(slotEnd, -30));
            setSlotToBookEnd(slotEnd);
        }
    }
    const selectedItem = (e, data) => {
        console.log(data);
        setSelectedPlan({ ...data });
    }
    return (
        <div className="parent-container" style={{ paddingTop: '100px' }}>
            <div>
                <Navigation />
            </div>

            <div
                style={{
                    margin: "60px 10vw 0 10vw",
                    padding: '0 0 20px 0',
                    display: "flex",
                    flexDirection: width >= 992 ? "row" : "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div style={{ width: width >= 992 ? "40vw" : "90vw" }}>
                    <div style={{ padding: "20px", backgroundColor: "#edecec", borderRadius: "10px 10px 0 0" }}>
                        Lessons
                        <br />
                        Choose how many lessons you would like to buy
                    </div>



                    <div style={{ backgroundColor: "#fefeff", borderRadius: "0 0 10px 10px", padding: "0 0 10px 0" }} onChange={onCall}>
                        {lessonPrices.map((item, index) => (
                            <label
                                style={{
                                    borderBottom: lesson === item.number ? "1px solid" : "none",
                                    borderTop: lesson === item.number ? "1px solid" : "none",
                                    backgroundColor: lesson === item.number ? "#ffe9ec" : "#fefeff",
                                    padding: "10px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                                onChange={(e) => selectedItem(e, item)}
                            >
                                <div style={{ display: "flex", gap: "5px" }}>
                                    <input type="radio" id={item.number} name="price_choice" value={item.number} />
                                    <div style={{ marginLeft: "10px" }}>{item.number}</div>
                                </div>
                                <div style={{ display: "flex", gap: "20px" }}>
                                    {item.final ? <div style={{ color: "#82d481" }}>{item.final}</div> : <></>}
                                    <div style={{ color: "#fe587a", textDecoration: item.final ? "line-through" : "none" }}>{item.actual}</div>
                                </div>
                            </label>
                        ))}
                    </div>

                    {/* <div style={{ marginTop: "20px", padding: "20px", backgroundColor: "#edecec", borderRadius: "10px 10px 0 0" }}>Choose a Payment Method</div> */}
                    {/* <div style={{ padding: "20px", backgroundColor: "#fefeff", borderRadius: "0 0 10px 10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <input type="radio" id="method1" name="pay_method" value="new_card" />
                            <label for="method1">Add New Card</label>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <input type="radio" id="method2" name="pay_method" value="paypal" />
                            <label for="method2">
                                <img src={paypal} style={{ width: "80px" }} />
                            </label>
                        </div>
                    </div> */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: '10px', marginTop: '20px', padding: '10px 0' }}>
                        Payment will be done using &nbsp; <img src={razorpayLogo} style={{ width: "100px" }} alt="Razotpay Icon" />
                    </div>
                </div>
                <div
                    style={{
                        marginTop: width >= 992 ? "" : "50px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        akignItems: "center",
                        width: width >= 992 ? "30vw" : "80vw",
                        padding: "20px",
                        backgroundColor: "#fefeff",
                        borderRadius: "10px",
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <img src={student} alt="person_img" style={{ marginTop: "-50px", borderRadius: "50%", width: "70px", height: "70px" }} />
                    </div>
                    <div>{profile && profile.fullName}</div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>Session</div>
                        <div>Price</div>
                    </div>
                    <div style={{ margin: '10px 0' }}>
                        <hr />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {trail && diffMin === 30 ?
                            <div>
                                30 Minute Trial Lesson
                                <br />
                                {`${monthArr[slotStart.getMonth()]} ${slotStart.getDate()}, ${slotStart.getFullYear()}, ${convertHours(slotStart.getHours(), slotStart.getMinutes())}`}
                            </div>
                            :
                            <div>
                                <label>{`${monthArr[slotStart.getMonth()]} ${slotStart.getDate()}, ${slotStart.getFullYear()}`}</label>   <br />
                                <label>{chosenEvent.title}</label>    <br />
                                <label>{selectedPlan && selectedPlan.number ? selectedPlan.number : ''}</label>   <br />

                                {/* Choose a 30 Minute Trial Lesson */}
                                {/* <br /> */}
                                {/* {`${monthArr[slotStart.getMonth()]} ${slotStart.getDate()}, ${slotStart.getFullYear()}`} */}
                                {/* <div onChange={(e) => selectSlot(e)}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '-10px' }}>
                                        <input type="radio" id="halfhourlesson1" name="halfhourlesson" value="aaas" style={{ marginRight: '5px' }} />
                                        <label htmlFor="halfhourlesson1">
                                            {`${convertHours(slotStart.getHours(), slotStart.getMinutes())} to ${convertHours(addMinutes(slotStart, 30).getHours(), addMinutes(slotStart, 30).getMinutes())}`}
                                        </label>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input type="radio" id="halfhourlesson2" name="halfhourlesson" value={addMinutes(slotEnd, -30)} style={{ marginRight: '5px' }} />
                                        <label htmlFor="halfhourlesson2">
                                            {`${convertHours(addMinutes(slotEnd, -30).getHours(), addMinutes(slotEnd, -30).getMinutes())} to ${convertHours(slotEnd.getHours(), slotEnd.getMinutes())}`}
                                        </label>
                                    </div>
                                </div> */}
                                <br />
                                {/* <label htmlFor="halfhourlesson2">
                                {chosenEvent.title}
                                </label> */}
                            </div>
                        }
                        <div>$ {trail ? '0' : selectedPlan && selectedPlan.itemPrice ? selectedPlan.itemPrice : ''}</div>
                    </div>
                    {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ color: "red" }}>Apply Coupon</div>
                        <div>{freeTrialExists ? '$ 0' : '$1'}</div>
                    </div> */}
                    {/* <div style={{ alignSelf: "flex-start" }}>Fee ?</div> */}
                    <div style={{ margin: '10px 0' }}>
                        <hr />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>Total</div>
                        <div>{trail ? '$ 0' : `$ ${selectedPlan && selectedPlan.itemPrice ? selectedPlan.itemPrice : ''}`}</div>
                    </div>
                    <div
                        style={{ fontSize: '20px', marginTop: "10px", borderRadius: "10px", textAlign: "center", color: "#fefeff", backgroundColor: "#5bcf5f", padding: "12px 0", cursor: 'pointer' }}
                        onClick={() => { trail ? handleCheckout() : displayRazorpay() }}
                    >
                        <i class="fas fa-lock"></i>
                        &nbsp; Secure Checkout
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
