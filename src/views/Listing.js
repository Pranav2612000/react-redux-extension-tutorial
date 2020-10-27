import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import LinkList from '../components/LinkList/LinkList';
import Pagination from '../components/common/Pagination';
import InfoMessage from './../components/common/InfoMessage';
import Header from './Header';

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
                  break;
                }
        }
}

const Main = ({ linkList }) => {
  //sleep(2000);
  const [filter, setFilter] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [inputVal, setInputVal] = useState("");

  const changeFilter = (e) => {
    setFilter(e.target.value);

    setCurrentPage(0);
  };

  const updateInput = (val) => {
    val = "   " + val + "\0";
    setInputVal(val);
  }
  
  useEffect(() => {
    console.log("rendering");
  });
  return (
    <React.Fragment>
      <Header/>
      <div>Sample input-box to change state of the application</div>
      <input value={inputVal} onChange={(e) => updateInput(e.target.value)}/>

      {linkList.length > 0 ? (
        <React.Fragment>
          <hr />
          <select
            name="filter_linkList"
            id="filter_linkList"
            style={{ marginTop: 10, padding: 10 }}
            onChange={changeFilter}
          >
            <option value="ALL">Order By</option>
            <option value="MOST_VOTED">Most Voted(Z->A)</option>
            <option value="LESS_VOTED">Less Voted(A->Z)</option>
          </select>
        </React.Fragment>
      ) : (
        <InfoMessage>
          No Pages available. Press + to add.
        </InfoMessage>
      )}

      <LinkList
        activeFilter={filter}
        pageSize={pageSize}
        currentPage={currentPage}
      />

      {linkList.length > pageSize && (
        <Pagination
          pageSize={pageSize}
          currentPage={currentPage}
          totalElements={linkList.length}
          changePage={(pageNumber) => setCurrentPage(pageNumber)}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  linkList: state.linkList, 
});

export default connect(mapStateToProps)(Main);
