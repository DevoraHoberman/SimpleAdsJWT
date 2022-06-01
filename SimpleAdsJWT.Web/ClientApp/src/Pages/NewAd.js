
import getAxios from '../AuthAxios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


const NewAd = () => {

    const [formData, setFormData] = useState({        
        description:'',        
        phoneNumber:''
    })
    const history = useHistory();
    
    const onTextChange = e => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }
    const onFormSubmit = async e => {
        console.log('c')
        e.preventDefault();
        await getAxios().post('api/home/addad', formData);
        history.push('/');
    }
    return (<>
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h2>New Ad</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 offset-md-3 jumbotron">
                <form onSubmit={onFormSubmit}>
                    <div className="row">
                        <div className="col-md-12">
                            <input value={formData.phoneNumber} onChange={onTextChange} type="text" placeholder="Phone Number" className="form-control" name="phoneNumber" />
                        </div>
                    </div>
                    <br />
                    <textarea value={formData.description} onChange={onTextChange} name="description" className="form-control" rows="10" placeholder="Description"></textarea>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div></>);
}

export default NewAd;