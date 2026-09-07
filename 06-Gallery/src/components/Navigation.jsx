import styles from '../styles/navigation.module.css'
export function Navigation({totalPages,currentPage}) {
    const pages = Array.from({length: totalPages}, (_, i) => i + 1);
    return(
        <nav className={styles.nav}>
            <a className={currentPage === 1 ? `${styles.disabled} ${styles.a}` : `${styles.a}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left">
	            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
	            <path d="M15 6l-6 6l6 6" />
                </svg>
            </a>
            {pages.map((page) => (
                <a key={page} className={page === currentPage ? `${styles.active} ${styles.a}` : `${styles.a}`}>{page}</a>
            ))}
            <a className={currentPage === totalPages ? `${styles.disabled} ${styles.a}` : `${styles.a}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
	            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
	            <path d="M9 6l6 6l-6 6" />
                </svg>
            </a>
    </nav>
    )
}