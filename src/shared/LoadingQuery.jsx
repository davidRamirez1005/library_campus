import React from 'react'
import style from '../assets/css/loadingQuery.module.css'

export default function LoadingQuery() {
    return (
        <div>
            <div className={style.dot_spinner}>
                <div className={style.dot_spinner__dot}></div>
                <div className={style.dot_spinner__dot}></div>
                <div className={style.dot_spinner__dot}></div>
                <div className={style.dot_spinner__dot}></div>
                <div className={style.dot_spinner__dot}></div>
                <div className={style.dot_spinner__dot}></div>
                <div className={style.dot_spinner__dot}></div>
                <div className={style.dot_spinner__dot}></div>
            </div>
        </div>
    )
}
