import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import axios from "axios";
import "./NewMetting.scss";
import './Calander.css';
const type = [
  { name:"Initial Consulting", time: 60 },
  { name:"Pick Up Dress", time: 30 },
  { name:"Fitting", time: 40 },
];

const NewMeeting = () => {
  const props = { placeholder: 'Please Select...' };
  const [value, onChange] = useState(new Date());
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const getAdmins = async () => {
      const res = await axios.get("http://localhost:5000/api/users/admins");
      setAdmins(res.data);
    };
    getAdmins();
  }, []);

  return (
    <div className="new-metting">
      <select>
        <option disabled selected>
          Please Choose
        </option>
        {admins.map((admin) => {
          const { username } = admin;
          return <option key={username}>{username.toUpperCase()}</option>;
        })}
      </select>
      <select>
        <option disabled selected >
          Type Of Meeting
        </option>
        {type.map((item) => {
          return <option key={item.name} >{item.name}</option>;
        })}
        
      </select>
      <div className='calendar-data'>
        <Calendar onChange={onChange} value={value} />
      </div>
    </div>
  );
};

export default NewMeeting;
