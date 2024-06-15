import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const CreateDoor = () => {
    const navigation = useNavigate();
    const [formData, setFormData] = useState({
        doorName: '',
        doorType: '',
        manufacturer: '',
        certification: ''
    });
    const [qrCodeData, setQrCodeData] = useState('');
    const [showQRCode, setShowQRCode] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const doorCollectionRef = collection(db, 'door');
            const docRef = await addDoc(doorCollectionRef, formData);
            console.log('Document written with ID: ', docRef.id);
            setQrCodeData(docRef.id); // Store the document ID for QRCode generation
            setShowQRCode(true); // Show QRCode component
            // Clear form after submission
            setFormData({
                doorName: '',
                doorType: '',
                manufacturer: '',
                certification: ''
            });
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <div>
            <form className="m-5 border p-3" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="doorName">Door Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="doorName"
                            placeholder="Door Name"
                            value={formData.doorName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="doorType">Door Type</label>
                        <input
                            type="text"
                            className="form-control"
                            id="doorType"
                            placeholder="Door Type"
                            value={formData.doorType}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="manufacturer">Manufacturer</label>
                    <input
                        type="text"
                        className="form-control"
                        id="manufacturer"
                        placeholder="Manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="certification">Certification</label>
                    <input
                        type="text"
                        className="form-control"
                        id="certification"
                        placeholder="Certification"
                        value={formData.certification}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Fire Door
                </button>
            </form>
            
            {showQRCode && (
                <div className="text-center">
                    <div className='d-flex justify-content-center'>
                        <button
                            className="btn btn-primary "
                            onClick={() => navigation('/list') }
                        >
                           View door list
                        </button>
                    </div>
                    <h4>QR Code for Document ID: {qrCodeData}</h4>
                    <QRCode value={qrCodeData} />
                </div>
            )}
        </div>
    );
};

export default CreateDoor;
