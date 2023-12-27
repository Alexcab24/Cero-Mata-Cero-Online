import { useDispatch, useSelector } from "react-redux";
import { startGoogleSignIn } from "../store/auth/thunks"
import { useNavigate } from "react-router-dom";


const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    


    const {status} = useSelector(state => state.auth )
  
    if(status === 'authenticated'){
      return navigate('/room')
    }

   

    const onGoogleSignIn = () => {
        console.log('onGoogleSignIn');
        dispatch( startGoogleSignIn() );
      }

  

    return (
        <div>
            <button onClick={onGoogleSignIn}>
                Sign in With Google
            </button>

        </div>
    )
}

export default LoginPage
