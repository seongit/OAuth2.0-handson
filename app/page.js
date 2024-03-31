'use client';

import { useState } from 'react';

import './main.css';

import axios from 'axios';

export default function Home() {
  const [image, setImage] = useState();

  const handleClick = async () => {
    try {
      const { data } = await axios.get('/api/profile');
      setImage(data.profile)
    } catch (error) {
      if(error.response.status === 401){
        if(window.confirm('권한이 없습니다. 인증하시겠습니까?')){
            window.location.assign('/api/authorize');
        }
      }
    }
  };

  const handleChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <main>
      <h1>사진 인화 서비스</h1>

      <p>
        사진을 선택해 주세요.
        <input onChange={handleChange} accept="image/*" type="file" />
      </p>

      <p>
        깃헙 프로필 사진
        {' '}
        <button onClick={handleClick} type="button">불러오기</button>
      </p>

      {image && (
        <div className="box">
          <span style={{ backgroundImage: `url(${image})` }} />
        </div>
      )}
    </main>
  );
}
