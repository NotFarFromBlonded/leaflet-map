import React from 'react'


const TabularData = (props) => {

  return (
    <div className="overflow-x-auto relative max-w-5xl mx-auto my-8" style={{fontFamily: 'Open Sans, sans-serif'}}>
        <div className="font-mono text-lg font-semibold" style={{fontFamily: 'Open Sans, sans-serif',fontSize:"30px",marginBottom:"25px"}}>
            <p>{props.name}</p>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {["Material", "Volume (ton)", "CO2 emission (tCO2)", "Cost (Lakhs)"].map((column, idx)=>(
                        <th scope="col" className={idx === 0?"py-3 px-6":"py-3 px-6 text-center"}>
                            {column}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.tableData.map((item, idx)=>(
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.material}
                        </th>
                        <td className="py-4 px-6 text-right">
                            {(item.volume_in_ton*props.multiplier).toFixed(3)}
                        </td>
                        <td className="py-4 px-6 text-right">
                            {(item.CO2emission*props.multiplier).toFixed(3)}
                        </td>
                        <td className="py-4 px-6 text-right">
                            {((item.cost*props.multiplier)/100000).toFixed(3)}
                        </td>
                        
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr className="font-semibold text-gray-900 dark:bg-gray-900 dark:text-white">
                    <th scope="row" className="py-3 px-6 text-base ">Total</th>
                    <td className="py-3 px-6 text-right">{(props.tableData.map((item)=>item.volume_in_ton).reduce((acc,el)=>acc+=el,0)*props.multiplier).toFixed(3)}</td>
                    <td className="py-3 px-6 text-right">{(props.tableData.map((item)=>item.CO2emission).reduce((acc,el)=>acc+=el,0)*props.multiplier).toFixed(3)}</td>
                    <td className="py-3 px-6 text-right">{((props.tableData.map((item)=>item.cost).reduce((acc,el)=>acc+=el,0)*props.multiplier)/100000).toFixed(3)}</td>
                </tr>
            </tfoot>
        </table>
    </div>
  )
}

export default TabularData