import fb from '../firebase-config/config';

export default class FbRefs {
  fbProgramRepsRef = (userName, programName, index) =>
    fb.database().ref(`${userName}/${programName}/${index}/repsDone`);

  fbProgramRef = (userName, programName) =>
    fb
      .database()
      .ref(`${userName}`)
      .child(programName);

  fbProgramDataRef = (userName, programName, index, keyName) =>
    fb.database().ref(`${userName}/${programName}/${index}/${keyName}`);

  fbProgramHistoryRef = (userName, programName) =>
    fb.database().ref(`${userName}//history/${programName}`);

  fbProgramHistoryItemRef = (userName, programName, time) =>
    fb.database().ref(`${userName}//history/${programName}/${time}`);

  fbRef = userName => fb.database().ref(`${userName}`);

  fbHomePageProgramRef = programName => fb.database().ref(`home/${programName}`);

  fbHomePageRef = () => fb.database().ref(`home`);

  fbOnlineUsers = () => fb.database().ref('onlineUsers');
}
