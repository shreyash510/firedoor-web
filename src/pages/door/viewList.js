import React, { useEffect, useState } from 'react'
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const ViewList = () => {
    const navigation = useNavigate();
    const [doorList, setDoorList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const doorCollectionRef = collection(db, 'door');
            const doorSnapshot = await getDocs(doorCollectionRef);
            // Map over the documents and create an array with ID and data
            const doorList = doorSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })); setDoorList(doorList);
        };

        fetchData();
    }, []);

    const handleCreateDoor = async () => {
        navigation('/createDoor');
    }

    return (
        <>
        <div className='mt-4 d-flex justify-content-end mr-4'>
            <button onClick={handleCreateDoor} className='btn btn-primary'>Create Door</button>
        </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>QR</th>
                        <th scope='col'>Door Name</th>
                        <th scope='col'>Door Type</th>
                        <th scope='col'>Manufacturer</th>
                        <th scope='col'>Certification</th>
                    </tr>
                </thead>
                <tbody>
                    {doorList.map((door, index) => (
                        <tr key={index} className='border'>
                            <td>
                                <>
                                    <QRCode value={door.id} size={70}/>
                                </>
                            </td>
                            <td>{door.doorName}</td>
                            <td>{door.doorType}</td>
                            <td>{door.manufacturer}</td>
                            <td>{door.certification}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    )
}

export default ViewList