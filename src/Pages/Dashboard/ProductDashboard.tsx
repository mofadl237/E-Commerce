import { useGetProductFetchQuery } from "../../app/Services/GetProductDash"
import TableSkelton from "../../components/TableSkelton"
import ErrorHandler from "../../Error/ErrorHandler";
import TableProduct from './../../components/TableProduct';


const ProductDashboard = () => {
  //1-state
  /** عاوز اجيب الداتا الاول لكل المنتجات هنا  باستخدام ال RTK */
  const {isLoading,data,isError}= useGetProductFetchQuery();
   
  //2- handler
  if(isLoading) return Array.from({length:10},(_,i)=><TableSkelton key={i}/>)
  if(isError) return <ErrorHandler/>
  //3-render
  return (
   <>
   {
    data&& <TableProduct   products={data.data} /> 
   }
   </>
  )
}

export default ProductDashboard