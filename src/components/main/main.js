import React, { useState, useEffect, useReducer } from "react";
import './main.css';
import {People} from "../people/people"
import { Paginaion } from "../pagination.js";
import { Description } from "../description/description";
import { Modal } from "../modal/modal";


export const Main = () => {
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState({});
    const [isMore, setIsMore]=useState(0);
    const [currentPage, setCurrentPage]=useState(1);
    const [peoplePerPage]=useState(50);
    const [loading, setLoading] = useState(false);
    const [ind, setInd] = useState(null);
    const [isModal, setIsModal]=useState(false);
    const [isValid, setIsValid]=useState(false);
    const [filtr, setFiltr]=useState(null);
    const [reserve, setReserve]=useState([]);
    const [newPerson, dispatch]=useReducer(reducer, {
      id: "", 
      firstName: "", 
      lastName: "", 
      email: "", 
      phone: "", 
      address: {
        streetAddress: 'unknown',
        city: 'unknown',
        state: 'unknown',
        zip: 'unknown'
      },
      description: 'unknown'
    });

    const lastPersonIndex = currentPage * peoplePerPage;
    const firstPersonIndex = lastPersonIndex - peoplePerPage;
    
    const takeData = (link) => {
      fetch(link)
      .then((res) => {return res.json().then((result)=> {
        setData(result);
        setLoading(false);
      })})
    };

    function reducer(state, action) {
      switch (action.type) {
          case "changeId":
              return {...state, id: action.payload}
          case "changeFirstName":
              return {...state, firstName: action.payload};
          case "changeLastName":
              return {...state, lastName: action.payload};
          case "changeEmail":
              return {...state, email: action.payload};
          case "changePhone":
              return {...state, phone: action.payload}
      }
    };

    const requestSort = key => {
      let direction = 'ascending';
      if (sortConfig.key === key && sortConfig.direction === 'ascending') direction = 'descending';
      setSortConfig({ key, direction });
      setInd(null);
    };

    const GetIndex = (index) => {
      setInd(index);
    };

    const CloseModal = () => {
      setIsModal(false);
    };
        
    useEffect(()=> {
      if (isMore==2) takeData('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}') 
      else if (isMore==1) takeData("http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D");
    }, [isMore] ); 

    useEffect(()=> {
      if (newPerson.id!=="" && newPerson.firstName!=="" && newPerson.lastName!=="" && newPerson.email!=="" && newPerson.phone!=="") {
        setIsValid(true)
      } else setIsValid(false); 
    }, [newPerson]);

    const toFiltr=()=> {
      if (filtr!=='' && filtr!==null) {
        let filteredData=[];
        data.map((item)=> {
          let isTrue; 
          for (let field in item) {
            const interm=(item[field].toString()).toLowerCase();
            if (interm.includes(filtr)) {
              isTrue = true; 
              break; 
            } else isTrue = false;
          }
          if (isTrue) filteredData.push(item);
        }); 
        setReserve(data);
        setData(filteredData);
        setInd(null);
      } 
    };

    const OnModalClick = () => {
      CloseModal();
      reserve.unshift(newPerson);
      return data.unshift(newPerson);
    };
    
    if (sortConfig.key!==undefined) {
    data.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    }; 

    const currentPeople=data.slice(firstPersonIndex, lastPersonIndex);
    
    useEffect(()=> {
      if (filtr==="") setData(reserve);
    }, [filtr]); 

    const Paginate = (pageNumber)=> {
      setCurrentPage(pageNumber);
    }
  
    if (isMore==0) return (
        <div>
        <h4>Сколько данных показать?</h4>
        <button className="btn1" onClick={()=>{setIsMore(1); setLoading(true)}}>Больше</button>
        <button className="btn1" onClick={()=>{setIsMore(2); setLoading(true)}}>Меньше</button>        
        </div>
    )
    else return (
     
    <div className="wrapper"> 
      <div className="vvod">
        <button className="btn2" onClick={()=>setIsModal(true)}> Добавить пользователя </button>
        <div>
          <input className="inp" onChange={(event)=>setFiltr(event.target.value)}></input>
          <button className="btn3" onClick={toFiltr}>Найти</button>
        </div>
      </div>
      <Modal isModal={isModal} 
      onClose={CloseModal} 
      onInputChange={dispatch} 
      onButtonClick={OnModalClick}
      isValid={isValid} />
      
      <People people={currentPeople} 
      loading={loading} 
      setSortedField={requestSort} 
      sortField={sortConfig.key} 
      sortDir={sortConfig.direction}
      getIndex={GetIndex}
      currentIndex={ind}/>
      {ind!==null && <Description obj={data[ind]}/>}
      
      <Paginaion peoplePerPage={peoplePerPage} totalPeople={data.length} paginate={Paginate}/>
    </div>
    )
};



 