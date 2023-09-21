import React from 'react'
import { Menu } from '@/shared/Menu';
import Login from './components/Login';
import styles from './assets/css/container.module.css'
import rocket from './assets/img/rocket.png'
import planet from './assets/img/planet4.png'


export default function Index() {
  return (
    <div style={{ height: '100%' }}>
      <div className="row">
      <Menu />
      <br />
        <div className="col-4">
          <div className="form">
            <Login/>
          </div>
        </div>
        <div className="col-8">
          <div className={styles.relleno}>
            <div className="row">
              <div className="col">
                <div className={styles.img1}>
                    <img src={rocket} alt=""  />
                </div>
              </div>
                  <div className="col">
                    <div className={styles.img2}>
                        <img src={planet} alt=""  style={{ width: 500 }}/>
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
