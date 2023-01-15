import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useFieldArray } from 'react-hook-form'

type prop = {
  Type: String
}

const Form = (props:prop) => {
  const { handleSubmit, control, reset, register } = useForm()
  const [queries, setQueries] = useState(false);
  const { fields:queryField, append:queryAppend,remove:queryRemove} = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "Queries", // unique name for your Field Array
  });
  const { fields:bodyField, append:bodyAppend,remove:bodyRemove} = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "Body", // unique name for your Field Array
  });

  const[success,setSuccess] = useState<Boolean>(false)
  const[data,setData] = useState<null | string>(null)



  const submit = async (data: any) => {
    console.log("Sent")
    const res = await fetch(`http://localhost:5000/${props.Type}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })
    const result = await res.text()
    console.log(result)
    setSuccess(true)
    setData(result)
  }

  

  return (
    <>
    <form onSubmit={handleSubmit(submit)} className='my-5 p-4 rounded-lg mx-2  bg-white '>
      <h3 className="text-xl capitalize font-bold">{props.Type}</h3>
      <div className='flex flex-col gap-2'>
        <div className='grid grid-rows-1 gap-2 mt-4 grid-cols-2'>

          <div className='flex flex-col gap-1'>
            <label htmlFor="getName">Endpoint</label>
            <input type="text" className='text-input' id="getName" {...register("Endpoint", { required: true })} required />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="trycatch">Trycatch</label>
            <select className='text-input p-[.4rem]' id="trycatch" {...register("TryCatch", { required: true })} required>
              <option selected value="true">Enabled</option>
              {/* <option value="false">Disabled</option> */}
            </select>
          </div>

          

        </div>

        <div className='flex my-2 flex-col gap-1'>
          <label htmlFor="CatchMessage">Catch Message</label>
          <input className='text-input' defaultValue={"Some Error Occuered"} id="CatchMessage" {...register("CatchMessage", { required: true })} required />
        </div>

        <div className='flex flex-col items-start gap-2'>
          <div>
            <label htmlFor="query">Queries</label>
            <ul>
              {queryField.map((item, index) => (
                <li key={item.id}>
                  <input className='text-input my-[.1rem]' {...register(`Queries.${index}`)} placeholder = "Query" />
                  <button className="formbutton bg-red-500 text-white" type="button" onClick={() => queryRemove(index)}>Delete</button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className='formbutton my-2 mx-0 bg-blue-500 text-white'
              onClick={() => queryAppend({ query: "Query" })}
            >
              Add
            </button>
          </div>
        </div>


{props.Type=="post"?(
          <div className='flex flex-col items-start gap-2'>
          <div>
            <label htmlFor="query">Body</label>
            <ul>
              {bodyField.map((item, index) => (
                <li key={item.id}>
                  <input className='text-input my-[.1rem]' {...register(`Body.${index}`)} placeholder = "Body" />
                  <button className="formbutton bg-red-500 text-white" type="button" onClick={() => bodyRemove(index)}>Delete</button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className='formbutton my-2 mx-0 bg-blue-500 text-white'
              onClick={() => bodyAppend({ query: "Body" })}
            >
              Add
            </button>
          </div>
        </div>

):(<></>)}
      </div>
      <input type="submit" className='bg-slate-200 px-4 py-2 mb-4 rounded-lg hover:bg-white cursor-pointer' value="Submit" />
    </form>

    {data?(
      <div className='bg-[#0A2647] p-7 mx-2 rounded-lg leading-7 text-white'>
      <p className='bg-inherit' dangerouslySetInnerHTML={{__html:data}}></p>
      </div>
    ):(
      <>
      </>
    )}
    </>
  )
}

export default Form