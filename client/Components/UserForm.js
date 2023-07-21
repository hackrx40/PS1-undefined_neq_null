import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import './css/UserForm.css';

const UserForm = () => {
  const router = useRouter();
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bloodGrp, setBloodGrp] = useState('');
  const prodUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission, for example, sending the data to Firebase or processing it in any other way you need.
    console.log('User details:', { age, gender, weight, height, bloodGrp });
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');
    const avatarURL = localStorage.getItem('avatarURL');

    axios
      .post(`${prodUrl}api/v1/user/register`, {
        email,
        name,
        avatarURL,
        age,
        gender,
        weight,
        height: height / 100,
        bloodGrp,
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('uid', res.data.data._id);
        router.push('/chat');
      })
      .catch((err) => console.log(err));

    // Reset the form after submission
    setAge('');
    setGender('');
    setWeight('');
    setHeight('');
    setBloodGrp('');
  };

  return (
    <div className="form container">
      <form className="form-box" onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-input">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="form-input">
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <div className="form-input">
          <label htmlFor="height">Height (cm):</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
        </div>
        <div className="form-input">
          <label htmlFor="bloodGrp">Blood Group:</label>
          <input
            type="text"
            id="bloodGroup"
            value={bloodGrp}
            onChange={(e) => setBloodGrp(e.target.value)}
            required
          />
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
