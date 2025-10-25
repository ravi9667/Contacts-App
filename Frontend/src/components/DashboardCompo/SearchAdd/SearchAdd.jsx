import React, { useState } from "react";
import add from "../../../assets/addition.png";
import search from "../../../assets/search.png"
import "./Search.scss";
import { useNavigate } from "react-router";

const SearchAdd = ({userId}) => {
    const navigate = useNavigate();

    return (
        <div className="search-addCont">
            <div className="search-box">
                <img src={search} alt="" className="search-icon"/>
                <input type="text" className="search-input" placeholder="Search here..." />
            </div>
            <img src={add} onClick={() => navigate(`/addContact?userId=${userId}`)} alt="add-Contact" className="addContact-btn" />
        </div>
    )
}

export default SearchAdd;