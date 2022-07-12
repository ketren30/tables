import React, { useState, useEffect } from "react";
import './main/pagination.css';

export const Paginaion = ({peoplePerPage, totalPeople, paginate})=> {
    const pageNumbers=[];
    const [currentPageNumber, setCurrentPageNumber] = useState(0);

    for (let i=1; i<= Math.ceil(totalPeople/peoplePerPage); i++) {
        pageNumbers.push(i);
    }

    return (
    <div>
        <ul className="pagination">
            {pageNumbers.map((number, index)=> {
                if (index==currentPageNumber) return (
                    <li className="current-page-item" key={number} onClick={()=>{paginate(number); setCurrentPageNumber(number)}}>
                        {number}
                    </li>
                    );
                return (
                <li className="page-item" key={number} onClick={()=>{paginate(number); setCurrentPageNumber(number-1)}}>
                    {number}
                </li>
                )
            })}

        </ul>
    </div>
    )
}