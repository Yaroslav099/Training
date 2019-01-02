import fb from '../firebase-config/config';

export default class FbServices {
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

  fbProgramRepsRef = (userName, programName, index) => {
    return fb.database().ref(`${userName}/${programName}/${index}/repsDone`);
  };

  fbProgramRef = (userName, programName) => {
    return fb.database().ref(`${userName}/${programName}`);
  };

  fbRef = userName => {
    return fb.database().ref(`${userName}`);
  };

  getProgramsNames = setNamesToState => {
    this.fbRef(this.getUserName()).on('value', snapshot => {
      if (snapshot.val()) {
        const names = Object.keys(snapshot.val());
        setNamesToState(names);
      } else setNamesToState([{ text: 'У вас покищо нема програм ' }]);
    });
  };

  getSpecificProgramData = (programName, setDataToState) => {
    this.fbProgramRef(this.getUserName(), programName).on('value', snapshot => {
      const data = snapshot.val();
      setDataToState(data);
    });
  };

  saveProgram = (data, programName) => {
    this.fbProgramRef(this.getUserName(), programName).set(data);
  };

  saveDoneReps = (reps, programName, index) => {
    this.fbProgramRepsRef(this.getUserName(), programName, index).set(reps);
  };

  deleteWord = (userName, word) => {
    this.fbRef(userName, word).set(null);
  };

  deleteProgram = programName => {
    this.fbProgramRef(this.getUserName(), programName).set(null);
  };

  getStatisticOfTheTraining = (programName, setStatisticToState) => {
    this.fbProgramRef(this.getUserName(), programName).on('value', snapshot => {
      setStatisticToState(snapshot.val());
    });
  };
}

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
      history.push('/authentication/');
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

const logOutUser = history => {
  fb.auth().signOut();
  localStorage.clear();
  window.location.reload();
};

export { signUpUser, signInUser, logOutUser };
