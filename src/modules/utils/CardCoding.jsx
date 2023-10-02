import React from 'react'
import style from '../../assets/css/utils.module.css'

export default function CardCoding() {
    return (
        <>
            <div id="card" className={style.cardCoding}>
                <div>
                    <div className="card-body">
                        <div className={style.code_container}>
                            <span className={style.line}><span  className={style.code_comment}>// Código de ejemplo</span></span>
                            <span className={style.line}><span className={style.code_keyword}>function</span><span className={style.code_function}>example</span>()</span>
                            <span className={style.line}>{'{'}</span>
                            <span className={style.lineIdent}><span className={style.code_keyword}>let</span> <span className={style.code_variable}>message</span> = <span className={style.code_string}>"Hello, World!"</span>;</span>
                            <span className={style.lineIdent}><span >console</span>.<span >log</span>(<span >message</span>);</span>
                            <span className={style.line}>{'}'}</span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
