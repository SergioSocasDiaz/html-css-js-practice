import styles from '../styles/navigation.module.css'
export function Navigation({totalPages,currentPage, handlePageChange, handleNextPage, handlePrevPage}) {
    const pages = totalPages > 5 ? [1,2,3,4,5,'...'] : Array.from({length: totalPages}, (_, i) => i + 1)
    const createPageUrl = (page)=>{
        const url = new URL(window.location)
        url.searchParams.set('page',page)
        return `${url.pathname}${url.search}`
    }
    return(
        <nav className={styles.nav}>
            <a  
                href={currentPage === 1 ? '#' : `${createPageUrl(currentPage-1)}`}
                onClick={(event)=>{
                    event.preventDefault()
                    handlePrevPage()
                }}
                className={currentPage === 1 ? `${styles.disabled} ${styles.a}` : `${styles.a}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left">
	            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
	            <path d="M15 6l-6 6l6 6" />
                </svg>
            </a>
            {
                pages.map((page) => (
                <a 
                    key={page}
                    href={page === '...' ? '#' : `${createPageUrl(page)}`}
                    onClick={(event)=>{
                        event.preventDefault()
                        if(page !== '...'){
                            handlePageChange(page)
                        }
                    }} 
                    className={`${page === currentPage ? `${styles.active} ${styles.a}` : `${styles.a}`} ${page === '...' ? styles.disabled : ''}`}
                >
                    {page}
                </a>
                ))
            }
            <a 
                href={currentPage === totalPages ? '#' : `${createPageUrl(currentPage+1)}`} 
                onClick={(event)=>{
                    event.preventDefault()
                    handleNextPage()
                }}
                className={currentPage === totalPages ? `${styles.disabled} ${styles.a}` : `${styles.a}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
	            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
	            <path d="M9 6l6 6l-6 6" />
                </svg>
            </a>
    </nav>
    )
}