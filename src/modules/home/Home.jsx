import viteLogo from '/vite.svg'
import home from '@/assets/css/home.module.css'
import { Menu } from '@/shared/Menu';


function Home() {

return (
    <>
    <Menu />
    <br /><br />
    <div>
        <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
    </div>
    <h1>Libreria</h1>
    <div className={home.container}>
        <h1 className={home.titulo}>Esta es la pagina de inicio</h1>
        <p>aqui va la introduccion sobre como usar la aplicacion</p>
    </div>
    </>
)
}

export default Home