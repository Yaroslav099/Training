import fb from '../firebase-config/config';
import FbRefs from './fb-refs';
import GetUser from './getUser-services';
const {
  fbProgramRepsRef,
  fbProgramRef,
  fbProgramDataRef,
  fbRef,
  fbHomePageProgramRef,
} = new FbRefs();

const { getUserNameFromStorage, getUserName } = new GetUser();
const { fbHomePageRef } = new FbRefs();

export default class FbServices {
  getProgramsNames = (ref, setNamesToState) => {
    ref(getUserName()).on('value', snapshot => {
      if (snapshot.val()) {
        const names = Object.keys(snapshot.val());
        setNamesToState(names);
      } else setNamesToState([{ text: 'У вас покищо нема програм ' }]);
    });
  };

  getSpecificProgramData = (ref, programName, setDataToState) => {
    ref(getUserNameFromStorage(), programName).on('value', snapshot => {
      const data = snapshot.val();

      setDataToState(data);
    });
  };

  getProgramDataFromHomePage = (programName, setDataToState) => {
    fbHomePageProgramRef(programName).on('value', snapshot => {
      const data = snapshot.val();
      setDataToState(data);
    });
  };

  saveProgram = (data, programName) => {
    if (data) {
      fbProgramRef(getUserNameFromStorage(), programName).set(data);

      data.forEach((el, index) => {
        fbProgramDataRef(getUserNameFromStorage(), programName, index, 'repsDone').set(0);
      });
    }
  };

  saveDoneReps = (reps, programName, index) => {
    fbProgramRepsRef(getUserName(), programName, index).set(reps);
  };

  deleteWord = (userName, word) => {
    fbRef(userName, word).set(null);
  };

  deleteProgram = programName => {
    fbProgramRef(getUserName(), programName).remove();
  };

  deleteProgramFromHomePage = programName => {
    const warning = window.confirm('Ви дійсно хочете видалити програму ?');
    if (warning) {
      fbHomePageRef()
        .child(programName)
        .set(null);
    } else return;
  };

  getStatisticOfTheTraining = (programName, setStatisticToState) => {
    fbProgramRef(getUserName(), programName).on('value', snapshot => {
      if (snapshot.val()) {
        setStatisticToState(snapshot.val());
      }
    });
  };

  upgradeProgram = (programData, progName, onSetNewData) => {
    programData.map(el => {
      el['repsDone'] = 0;
      return el;
    });
    fbProgramRef(getUserNameFromStorage(), progName).set(programData);
    onSetNewData();
  };

  addProgramToHomePage = (programName, programData) => {
    fbHomePageProgramRef(programName).set(programData);
  };
}
