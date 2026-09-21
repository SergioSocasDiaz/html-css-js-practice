import styles from '../styles/header.module.css'
import {Link} from './Link.jsx'
export function Header({handleMenuClick}) {

    
    return(
        <div style={{position: 'sticky', top: 0, left: 0, width: '100%', zIndex:3, backgroundColor: 'var(--neutral)'}}>
            <header className={styles.header}>
            <div className={styles.divTitle}>
                <button className={styles.hamburger} onClick={handleMenuClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2">
	                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
	                <path d="M4 6l16 0" />
	                <path d="M4 12l16 0" />
	                <path d="M4 18l16 0" />
                    </svg>
                </button>
                <Link path='/'>
                    <h1 className={styles.h1}>LUXE CATALOG</h1>
                </Link>
                
            </div>
            

            <nav className={styles.nav}>
                <a className={styles.a}>New Arrivals</a>
                <a className={styles.a}>Collections</a>
                <a className={styles.a}>Men</a>
                <a className={styles.a}>Woman</a>
                <a className={styles.a}>Sales</a>
            </nav>
            <div className={styles.divButton}>
                <button className={styles.button}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag">
	                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
	                <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304" />
	                <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
                    </svg>
                </button>
                
                <button className={styles.button}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user">
	                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
	                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
	                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                </button>

            </div>
        </header>
        </div>
        
    )
}