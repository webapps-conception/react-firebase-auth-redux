import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
  update,
  putAsync,
  selectUser,
} from './actions/user';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from 'react-router-dom'
import {
  FirebaseCheck,
  FirebaseSignIn,
  FirebaseSignOut
} from './firebaseAuth'
import SignIn from './signin'


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  //const [stateUser, isUser] = useState(null)
  const [stateError, isError] = useState(null)

  function Status() {
    FirebaseCheck()
    return (
      <p>
        Statut: {user != null ? 'utilisateur connecté en ' + user : 'déconnecté'}
      </p>
    )
  }

  function Error() {
    if (stateError) {
      return (
        <p style={{ color: 'red' }}><b>{stateError}</b></p>
      )
    }
  }
  
  function Buttons() {
    if (user) {
      return (
        <button onClick={handleClickSignOut}>
          Sign-out
        </button>
      )
    } else {
      return (
        <SignIn isError={isError} />
      )
    }
  }

  function handleClickSignOut() {
    FirebaseSignOut(isError)
  }

  return (
    <div className="App">
      <h1>Firebase Basic Authentificate Redux</h1>
      <Status />
      <Error />
      <Buttons />
    </div>
  )
}

export default App
