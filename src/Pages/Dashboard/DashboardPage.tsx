import { useSelector } from "react-redux"
import TableProduct from "../../components/TableProduct"
import type { RootState } from "../../app/store"


const DashboardPage = () => {
  //1-state
  const {product}=useSelector((state:RootState)=>state.cart)

  return (
    <TableProduct products={product}/>
  )
}

export default DashboardPage