import fb from '../firebase-config/config';

export default class FbServices {
  fbProgramRepsRef = (userName, programName, index) => {
    return fb.database().ref(`${userName}/${programName}/${index}/repsDone`);
  };

  fbProgramRef = (userName, programName) => {
    return fb.database().ref(`${userName}/${programName}`);
  };
  fbProgramDataRef = (userName, programName, index, keyName) => {
    return fb.database().ref(`${userName}/${programName}/${index}/${keyName}`);
  };

  fbProgramHistoryRef = (userName, programName) => {
    return fb.database().ref(`${userName}//history/${programName}`);
  };

  fbProgramHistoryItemRef = (userName, programName, time) => {
    return fb.database().ref(`${userName}//history/${programName}/${time}`);
  };

  fbRef = userName => {
    return fb.database().ref(`${userName}`);
  };

  fbHomePageProgramRef = programName => {
    return fb.database().ref(`home/${programName}`);
  };

  fbHomePageRef = () => {
    return fb.database().ref(`home`);
  };

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

  getProgramsNames = (ref, setNamesToState) => {
    ref(this.getUserName()).on('value', snapshot => {
      if (snapshot.val()) {
        const names = Object.keys(snapshot.val());
        setNamesToState(names);
      } else setNamesToState([{ text: 'У вас покищо нема програм ' }]);
    });
  };

  getSpecificProgramData = (ref, programName, setDataToState) => {
    ref(this.getUserNameFromStorage(), programName).on('value', snapshot => {
      const data = snapshot.val();
      setDataToState(data);
    });
  };

  getProgramDataFromHomePage = (programName, setDataToState) => {
    this.fbHomePageProgramRef(programName).on('value', snapshot => {
      const data = snapshot.val();
      setDataToState(data);
    });
  };

  saveProgram = (data, programName) => {
    this.fbProgramRef(this.getUserNameFromStorage(), programName).set(data);

    data.forEach((el, index) => {
      this.fbProgramDataRef(this.getUserNameFromStorage(), programName, index, 'repsDone').set(0);
    });
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

  saveProgramDataToHistory = (progName, time, data) => {
    this.fbProgramHistoryItemRef(this.getUserNameFromStorage(), progName, time).set(data);
  };

  getProgramHistory = (programName, setHistoryToState) => {
    this.fbProgramHistoryRef(this.getUserNameFromStorage(), programName).on('value', snapshot => {
      const val = snapshot.val();
      if (val) {
        setHistoryToState(val);
      }
    });
  };

  upgradeProgram = async (programName, weight, reps, programData) => {
    const getValueFromDb = (programData, index, type) => programData[index][type];
    programData.forEach((el, index) => {
      if (weight !== 0) {
        const oldWeight = getValueFromDb(programData, index, 'weight');
        const newWeight = oldWeight + weight;
        this.fbProgramDataRef(this.getUserNameFromStorage(), programName, index, 'weight').set(
          newWeight
        );
        this.fbProgramDataRef(this.getUserNameFromStorage(), programName, index, 'repsDone').set(0);
      }
      if (+reps !== 0) {
        const oldReps = getValueFromDb(programData, index, 'reps');
        const newReps = oldReps + reps;
        this.fbProgramDataRef(this.getUserNameFromStorage(), programName, index, 'reps').set(
          newReps
        );
        this.fbProgramDataRef(this.getUserNameFromStorage(), programName, index, 'repsDone').set(0);
      }
    });
  };

  addProgramToHomePage = (programName, programData) => {
    this.fbHomePageProgramRef(programName).set(programData);
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

const logOutUser = history => {
  fb.auth().signOut();
  localStorage.clear();
  window.location.reload();
};

export { signUpUser, signInUser, logOutUser };
