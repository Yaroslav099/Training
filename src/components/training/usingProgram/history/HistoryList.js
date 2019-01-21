import React, { Component } from 'react';
import { HistoryServices } from '../../../../firebase-services';
import { withRouter } from 'react-router-dom';
import { isLoggedIn } from '../../../hoc-helpers';
import Loader from '../../../loader';
import PageNoteFound from '../../../routeErr/PageNotFound';
import folderImg from '../../../../images/folder.png';

const { getProgramHistory } = new HistoryServices();

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
    if (history === null) return <PageNoteFound />;
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

export default withRouter(isLoggedIn(HistoryList));
