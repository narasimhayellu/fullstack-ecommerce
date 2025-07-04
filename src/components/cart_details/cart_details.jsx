import { Button, Typography } from "@mui/material";
import "./cart_details.css"
import DeleteIcon from "@mui/icons-material/Delete";

const CartDetails = (props) => {
const {cartItem, addQty, removeQty, removeItem} = props
const {qty, id, name, image} = cartItem;

    return(
    <div >
        <div className="cardcontainer"  key={id}>
            <img className="icon" src={image} alt="" />
          <div className="boxcontainer">
            <h1>{name}</h1>
            <h1>Quantity: {qty}</h1>
            <div className="d-flex justify-content-center">
            <Button variant="contained" color="error" onClick={()=>removeQty(id,qty)}>-</Button>
            <Typography variant="h6" component="h1">&nbsp; Qty:{qty} &nbsp;</Typography>
            <Button variant="contained" color="success" onClick={()=>addQty(id)}>+</Button>
            </div>
            <DeleteIcon style={{ height: 30, width: 30,  marginTop:15 }}
            onClick={() => removeItem(id)}/>
          </div>
        </div>
    </div>
       
    )
}

export default CartDetails;