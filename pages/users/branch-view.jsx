import BranchView from "../../src/components/Operator/BranchView";
import Layout from "../../src/components/common/Layout/Layout";
import axios from "axios";

import React, { useEffect, useState } from 'react'

export default function OperatorBranchView() {
  // const router = useRouter()
  // const {userId} =router.query

  // console.log("userId", userId)
  const[offices, setOffices] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3000/api/bookings').then(response=>setOffices(response.data.data))
  },[])
  return (
    <Layout>
      <BranchView offices={offices} />
    </Layout>
  )
}


