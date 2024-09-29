import React from 'react'
import { HiOutlinePencil, HiOutlineTrash, HiPlus } from "react-icons/hi2";
import 'ldrs/leapfrog'
import useSWRMutation from 'swr/mutation';
import { deleteProduct } from '../Api/fetcher';
import { Link } from 'react-router-dom';

const ProductRow = ({product : {id , name , createat , price}}) => {
const {trigger , isMutating} =useSWRMutation(import.meta.env.VITE_BASE_URL + "/products" , deleteProduct , {
  // optimisticData : (oldData) => oldData.filter(el => el.id !== id ),
  revalidate : false,
  rollbackOnError : true,
  populateCache : (newData ,oldData) =>  oldData.filter(el => el.id !== id ),
})

  const date = new Date(createat);
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',  
    year: 'numeric'
});
const formattedTime = date.toLocaleTimeString('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true  // This will give the 12-hour format with "am/pm"
})

const handleDeleteBtn = () => {
  trigger(id)
}

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <td className="px-6 py-4">{id}</td>
    <th
      scope="row"
      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    >
{name}
    </th>

    <td className="px-6 py-4">${price}</td>
    <td className="px-6 py-4 text-right text-nowrap">
      <p>{formattedDate}</p>
      <p>{formattedTime}</p>
    </td>
    <td className="px-6 py-4 text-right">
      <div className="flex gap-2 group justify-end items-center">
        <Link to={`/products/edit/${id}`} className="font-medium flex items-center  hover:scale-125 text-gray-600 size-5 dark:text-blue-500 hover:underline">
          <HiOutlinePencil />
        </Link>
        <button disabled={isMutating} onClick={handleDeleteBtn} className="flex justify-center  hover:scale-125 items-center font-medium text-red-600 size-5 dark:text-blue-500 hover:underline">
         { isMutating ? 

          // Default values shown  
          <l-leapfrog
           size="20"
            speed="2.5"
            color="black" 
          ></l-leapfrog> :  <HiOutlineTrash />

         }
        </button>
      </div>
    </td>
  </tr>
  )
}

export default ProductRow