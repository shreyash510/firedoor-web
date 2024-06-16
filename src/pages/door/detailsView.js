import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { collection, addDoc, getDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import QRCode from 'qrcode.react';


const DetailsView = (props) => {
  const location = useLocation();
  const navigation = useNavigate()
  const [doorDetails, setDoorDetails] = useState(null);
  useEffect(() => {
    getDoorDetailsById(location.pathname.split('/')[1]);
  }, [location])


  const getDoorDetailsById = async (id) => {
    const docRef = doc(db, 'door', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDoorDetails({ id: docSnap.id, ...docSnap.data() });
    } else {
      console.log("No such document!");
      setDoorDetails(null);
    }
  }

  console.log('Door Details:', doorDetails);
  return (
    <>
      <button className='btn btn-primary m-2' onClick={() => navigation('/list')}>Go Back</button>
      <div class="d-flex ">
        <div class="w-25 m-3 d-flex align-items-center">
          <QRCode
            value={doorDetails?.id || 'No QR Code'}
            size={100}
          />
        </div>
        <div className='w-75 m-3'>
          <h1>{doorDetails?.doorName}</h1>
          <div class=" ">
            <p style={{fontSize: '10px', fontWeight: 'bold'}} class="card-title">{doorDetails?.id}</p>
            <p  class="card-text m-0">{doorDetails?.manufacturer}</p>
            <p class='m-0'>{doorDetails?.doorType}</p>
          </div>
          <div class="">
            This is a details view of door
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailsView