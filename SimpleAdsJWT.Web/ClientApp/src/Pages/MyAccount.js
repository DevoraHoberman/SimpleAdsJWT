import React, { useState, useEffect } from 'react';
import getAxios from '../AuthAxios';
import { useAuthContext } from '../AuthContext';
import AdList from '../Components/AdList';

const MyAccount = () => {
    const [myAds, setMyAds] = useState([]);
    const { user } = useAuthContext();
    useEffect(() => {
        const getMyAds = async () => {
            const { data } = await getAxios().get(`/api/home/getadsforuser?id=${user.id}`);
            setMyAds(data);
        }
        getMyAds();
    }, [])
    return (<>
        <div className='container'>
            <div className='col-md-6 offset-md-3'>
                {myAds.map((a, i) => {
                    return <AdList
                        ad={a}
                        key={i}
                        canDelete={user && user.id === a.userId} />
                })}
            </div>
        </div></>);
}

export default MyAccount;