import style from '../assets/css/loading.module.css'

function Loading() {
return (
    <>
    <div className={style.content}>
        <div className={style.planet}>
            <div className={style.ring}></div>
                <div className={style.cover_ring}></div>
            <div className={style.spots}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

            </div>
        </div>
    <p>Cargando...</p>
    </div>
    </>
);
}

export default Loading;