import React from 'react'
import './transetionsuccess.css'
import { Link, useSearchParams } from 'react-router-dom'

export default function Transectionsuccess() {


  const serch = useSearchParams()[0];
  const referenceno = serch.get('reference')



  return (
    <div className='transection-body'>
        <div className="transetion-main">
            <h1 className="text-uppercase">order success</h1>
            <h3 className="">  Reference ID :- <span className="inner-id">{referenceno}</span></h3>
            <Link className="btn btn-outline-success text-uppercase" accordion-body to='/' >go Home</Link>
        </div>
    </div>
  )
}
