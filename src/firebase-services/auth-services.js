import fb from '../firebase-config/config';
import FbRefs from './fb-refs';
import GetUser from './getUser-services';

const { fbOnlineUsers } = new FbRefs();
const { getUserNameFromStorage } = new GetUser();

const signUpUser = (email, pass, userName, history) => {
  const auth = fb.auth();

  const promise = auth
    .createUserWithEmailAndPassword(email, pass)
    .then(() => {
      const userData = fb.auth().currentUser;

      userData.updateProfile({
        displayName: userName,
      });
    })
    .then(() => {
      alert('You created a new account! Now you can log in the page with your email and password.');
      history.push('/');
      window.location.reload();
    })
    .catch(error => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
};

const signInUser = (email, pass, history, getUserName, setUserName) => {
  const auth = fb.auth();
  const promise = auth.signInWithEmailAndPassword(email, pass).catch(error => {
    const errorMessage = error.message;
    alert(errorMessage);
  });

  fb.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      if (firebaseUser.displayName) {
        history.push('/');
      }
    }
  });
};

const setUserAsOnline = userName => {
  if (userName) {
    fbOnlineUsers()
      .child(userName)
      .set(userName);
  }
};

const setUserAsOffline = userName => {
  fbOnlineUsers()
    .child(userName)
    .set(null);
};

const logOutUser = history => {
  const userName = getUserNameFromStorage();
  localStorage.clear();
  fb.auth().signOut();
  setUserAsOffline(userName);
};

export { signUpUser, signInUser, logOutUser, setUserAsOnline, setUserAsOffline };
