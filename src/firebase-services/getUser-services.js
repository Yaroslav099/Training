import fb from '../firebase-config/config';
import FbRefs from './fb-refs';
const { fbOnlineUsers } = new FbRefs();

export default class GetUser {
  setUserNameToStorage = name => localStorage.setItem('authUser', name);

  getUserNameFromStorage = () => localStorage.getItem('authUser');

  getUserName = setUserName => {
    if (!setUserName) {
      return this.getUserNameFromStorage();
    } else {
      fb.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          this.setUserNameToStorage(firebaseUser.displayName);
          setUserName(firebaseUser.displayName);
        } else {
          setUserName(null);
        }
      });
    }
  };

  getOnlineUsers = setUsersToState => {
    fbOnlineUsers().on('value', snapshot => {
      if (snapshot.val()) {
        const users = Object.keys(snapshot.val());
        setUsersToState(users);
      }
    });
  };
}
