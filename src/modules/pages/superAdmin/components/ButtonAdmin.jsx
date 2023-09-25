import React from 'react'
import styled from 'styled-components'
import { FaUserAlt } from "react-icons/fa";

export default function ButtonAdmin() {
    return (
        <>
            <button>
                <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                        <FaUserAlt/>
                    </div>
                </div>
                <span>Agregar Admin</span>
            </button>
        
        </>
    )
    }

    const ButtonAdmin2 = styled.div `
    button {
        font-size: 1rem;
        background: #212121;
        color: white;
        fill: rgb(155, 153, 153);
        padding: 0.7em 1em;
        padding-left: 0.9em;
        display: flex;
        align-items: center;
        border: none;
        border-radius: 15px;
        font-weight: 1000;
    }
    
    button span {
        display: block;
        margin-left: 0.3em;
        transition: all 0.3s ease-in-out;
    }
    
    button svg {
        display: block;
        transform-origin: center center;
        transition: transform 0.3s ease-in-out;
    }
    
    button:hover {
        background: #000;
    }
    
    button:hover .svg-wrapper {
        transform: scale(1.25);
        transition: .5s linear;
    }
    
    button:hover svg {
        transform: translateX(1.2em) scale(1.1);
        fill: #fff;
    }
    
    button:hover span {
        opacity: 0;
        transition: .5s linear;
    }
    
    button:active {
        transform: scale(0.95);
    }
    `
