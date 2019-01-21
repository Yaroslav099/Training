import FbRefs from './fb-refs';
import GetUser from './getUser-services';

const { fbProgramHistoryItemRef, fbProgramHistoryRef } = new FbRefs();
const { getUserNameFromStorage } = new GetUser();

export default class HistoryServices {
  saveProgramDataToHistory = (progName, time, data, history, onSaveDataToDb) => {
    fbProgramHistoryItemRef(getUserNameFromStorage(), progName, time).set(data);
    fbProgramHistoryRef(getUserNameFromStorage(), progName).on('value', snapshot => {
      onSaveDataToDb(history);
    });
  };

  getProgramHistory = (programName, setHistoryToState) => {
    fbProgramHistoryRef(getUserNameFromStorage(), programName).on('value', snapshot => {
      const val = snapshot.val();
      if (val) {
        setHistoryToState(val);
      }
    });
  };

  deleteProgramFromHistory = programName => {
    fbProgramHistoryRef(getUserNameFromStorage(), programName).set(null);
  };
}
