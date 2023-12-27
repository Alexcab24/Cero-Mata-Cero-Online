import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveNickname } from "../store/nickname/nickSlice";


const NickNamePage = () => {
  const [nick, setNick] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setNick(event.target.value);
  };

  const handleJoinRoom = () => {
  if (nick == '') {
    alert('Debe escribir un Nickname')
  }else{
    dispatch(saveNickname(nick))
    navigate('/room')
  }
  

  }


  return (
   <>
    <div className="container">
      <h1>CERO MATA CERO</h1>

      <div className="nick-container">
        <div className="box-input">
          <input
            type="text"
            id="nick"
            placeholder='Nickname'
            value={nick}
            onChange={handleInputChange}

          />
        </div>
        <div className="buttonsNickname">
          <button className="nickButton" onClick={handleJoinRoom} >
            <span className="front">
             Ok, go!
            </span>
          </button>
        </div>
      </div>
     

   
    </div>
   </>
  )
}

export default NickNamePage
