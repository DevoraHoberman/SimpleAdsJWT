import axios from 'axios';
import React from 'react';
import { useAuthContext } from '../AuthContext';
import { useHistory } from 'react-router-dom';
import format from 'date-fns/format';

const AdList = ({ ad, i, canDelete }) => {
    const { user } = useAuthContext();
    const history = useHistory();
    const onDeleteButtonClick = async () => {
        await axios.post(`api/home/deletead?id=${ad.id}`);
        history.post('/');
    }
    const {name, date, phoneNumber, description} = ad
    return (<div key={i} className='jumbotron'>
        <h5>Listed by: {name} {console.log(name)}</h5>
        {/* <h5>Listed on: {format(new Date(ad.date), 'EEEE LLLL do, R')}</h5> */}
        <h5>{date}</h5>
        <h5>Phone Number: {phoneNumber}</h5>
        <h3>Details:</h3>
        <p>{description}</p>
        {canDelete && <button className='btn btn-danger' onClick={onDeleteButtonClick}>Delete</button>}
    </div>);
}

export default AdList;