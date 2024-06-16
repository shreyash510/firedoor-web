import React, { useEffect, useState } from 'react'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase'
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const ViewList = () => {
    const navigation = useNavigate();
    const [doorList, setDoorList] = useState([]);

    useEffect(() => {

        fetchData();
    }, []);

    const fetchData = async () => {
        const doorCollectionRef = collection(db, 'door');
        const doorSnapshot = await getDocs(doorCollectionRef);
        // Map over the documents and create an array with ID and data
        const doorList = doorSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })); setDoorList(doorList);
    };

    const handleCreateDoor = async () => {
        navigation('/createDoor');
    }

    const handleDelete = async (documentId) => {
        try {
            const docRef = doc(db, 'door', documentId); // Correctly construct document reference
            await deleteDoc(docRef);
            fetchData()
            console.log('Document successfully deleted!');
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    }

    const handleView = async (id) => {
        navigation(`/${id}`);
    }

    return (
        <>
            <div className='mt-4 d-flex justify-content-end mr-4'>
                <button onClick={handleCreateDoor} className='btn btn-primary'>Create Door</button>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Door Name</th>
                        <th scope='col'>Door Type</th>
                        <th scope='col'>Manufacturer</th>
                        <th scope='col'>Certification</th>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {doorList.map((door, index) => (
                        <tr key={index} className='border'>
                            <td>{door.id}</td>
                            <td>{door.doorName}</td>
                            <td>{door.doorType}</td>
                            <td>{door.manufacturer}</td>
                            <td>{door.certification}</td>
                            <td>
                                <button onClick={()=>handleView(door.id)} className='btn btn-primary mr-3'>View</button>
                                <button onClick={() => handleDelete(door.id)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    )
}

export default ViewList