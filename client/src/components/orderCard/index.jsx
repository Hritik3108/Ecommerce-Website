import {useNavigate} from 'react-router-dom'

const OrderCard = (props) => {
    const navigate = useNavigate();

    const {_id,time,totalAmount,status} = props.order

    async function handleOnClick(){
        navigate(`/order/?orderId=${_id}`);
    }

    return (
    <div className="order-item" onClick={()=>handleOnClick()}>
        <p><strong>Order ID:</strong> {_id}</p>
        <p><strong>Order Date:</strong> {time}</p>
        <p><strong>Total Amount:</strong> ${totalAmount}</p>
        <p><strong>Status:</strong> {status == 0 ? 'Payment Pending' : 'Payment Succcessful'}</p>
        <hr />
        <p>Click to view</p>
    </div>
    )
}

export default OrderCard;