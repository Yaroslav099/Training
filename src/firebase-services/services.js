import fb from '../firebase-config/config';

export default class FbServices {
  getUserName = () => 'admin';

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
      const names = Object.keys(snapshot.val());
      setNamesToState(names);
    });
  };

  getSpecificProgramData = (programName, setDataToState) => {
    this.fbProgramRef(this.getUserName(), programName).on('value', snapshot => {
      const data = snapshot.val();
      setDataToState(data);
    });
  };

  saveProgram = (data, programName) => {
    if (data && programName) {
      this.fbProgramRef(this.getUserName(), programName).set(data);
    }
  };

  saveDoneReps = (reps, programName, index) => {
    console.log(index);
    this.fbProgramRepsRef(this.getUserName(), programName, index).set(reps);
  };

  deleteWord = (userName, word) => {
    this.fbRef(userName, word).set(null);
  };
}
