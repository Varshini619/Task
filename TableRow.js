import React from 'react'
function TableRow({product}) {
  return (
    <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.title}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td>{product.category}</td>
        <td>{product.sold?"True":"False"}</td>
        <td><img src={product.image} alt="" 
        style={{
            width:"60%",
            height:"60%" 
        }}></img></td>
    </tr>
  )
}
export default TableRow