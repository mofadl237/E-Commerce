import TableSkelton from "../../components/TableSkelton"


const ProductDashboard = () => {
  //1-state
  /** عاوز اجيب الداتا الاول لكل المنتجات هنا  باستخدام ال RTK */

  //2- handler

  //3-render
  return (
   Array.from({length:10},(_,i)=><TableSkelton key={i}/>)
  )
}

export default ProductDashboard