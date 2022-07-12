import React, { useState, useReducer } from "react";
import './modal.css';

export const Modal = ({isModal, onClose, onInputChange, onButtonClick, isValid})=> {
    if (isModal) {return (
        <div className="modal" >
            <div onClick={onClose} className="close">&#10006;</div>
            id: <input onChange={(event) => {onInputChange({type: "changeId", payload: event.target.value})}}/><p/>
            Имя: <input onChange={(event) => onInputChange({type: "changeFirstName", payload: event.target.value})}/><p/>
            Фамилия: <input onChange={(event) => onInputChange({type: "changeLastName", payload: event.target.value})}/><p/>
            email: <input onChange={(event) => onInputChange({type: "changeEmail", payload: event.target.value})}/><p/>
            Номер телефона: <input onChange={(event) => onInputChange({type: "changePhone", payload: event.target.value})}/><p/>
            <button className="btn" onClick={onButtonClick} disabled={!isValid}>Добавить в таблицу</button>
        </div>
    )}
    return null;
}