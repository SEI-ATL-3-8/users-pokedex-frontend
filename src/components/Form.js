import { useState } from "react";

export default function Form({buttonName, handleSubmit}) {


    const [formParams, setFormParams] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormParams({
            ...formParams,
            [name]: value
        });
    }

    return (
        <form onSubmit={(e) => handleSubmit(e, formParams)}className="form">
            <input onChange={handleChange} name="email" type="email" placeholder="email" value={formParams.email}/>
            <input onChange={handleChange} name="password" type="password" placeholder="password" value={formParams.password} />
            <input type="submit" value={buttonName} />
        </form>

    );



}