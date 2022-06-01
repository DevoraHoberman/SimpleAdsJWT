import getAxios from '../AuthAxios';
import React, { useState, useEffect } from 'react';
import AdList from '../Components/AdList';
import axios from 'axios';
import { useAuthContext } from '../AuthContext';

const Home = () => {
    const [ads, setads] = useState([]);
const {user} = useAuthContext();
    const getAds = async () => {
        const { data } = await axios.get('/api/home/getads');
             
        setads(data);
    }
    useEffect(() => {
        getAds();
        console.log(ads);
    }, []);
    return (
   <div className='row'>
       <div className='col-md-6 offset-md-3'>
           {ads.map((ad, i)=>{
               return <AdList                
                ad={ad}
                key={i}
                canDelete={user && user.id === ad.userId}/>
           })}
       </div>
   </div>);
}

export default Home;