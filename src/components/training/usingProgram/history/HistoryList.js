import React, { Component } from 'react';
import FbServices from '../../../../firebase-services';
import Loader from '../../../loader';
import folderImg from '../../../../images/folder.png';
import { withRouter } from 'react-router-dom';

const { getProgramHistory } = new FbServices();

class HistoryList extends Component {
  state = {
    history: [],
  };

  setProgramDatesToState = history => {
    const historyDates = Object.keys(history);
    this.setState({ history: historyDates });
  };

  openOneOfHistoryDays = index => {
    const {
      history,
      location: { pathname },
    } = this.props;
    history.push(`${pathname}/${index}/`);
  };

  componentDidMount() {
    const {
      match: {
        params: { name },
      },
    } = this.props;
    getProgramHistory(name, this.setProgramDatesToState);
  }

  render() {
    const { history } = this.state;
    if (history[0] !== undefined) {
      return (
        <div className="historyContainer">
          {history.map((el, index) => (
            <div
              key={el}
              className="historyImgContainer"
              onClick={() => this.openOneOfHistoryDays(index)}
            >
              <img src={folderImg} className="historyFolderImg" />
              <span className="historyDate">{el}</span>
            </div>
          ))}
        </div>
      );
    } else return <Loader />;
  }
}

export default withRouter(HistoryList);
