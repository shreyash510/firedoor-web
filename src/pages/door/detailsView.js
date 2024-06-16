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
      <div class="card text-center">
        <div class="card-header">
          <QRCode
            value={doorDetails?.id || 'No QR Code'}
            size={100}
          />
          <h1>{doorDetails?.doorName}</h1>
        </div>
        <div class="card-body">
          <h5 class="card-title">{doorDetails?.id}</h5>
          <p class="card-text">{doorDetails?.manufacturer}</p>
          <a href="#" class="btn btn-primary">{doorDetails?.doorType}</a>
        </div>
        <div class="card-footer text-muted">
          This is a details view of door
          </div>
      </div>
    </>
  )
}

export default DetailsView