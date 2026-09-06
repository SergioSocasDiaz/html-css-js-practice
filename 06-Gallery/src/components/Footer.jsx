import styles from '../styles/footer.module.css'
export function Footer(){
    return(
        <footer className={styles.footer}>
            <div className={styles.divPrimary}>
                <h2>LUXE CATALOG</h2>
                <span>© 2026 LUXE E-COMMERCE ALL RIGHTS RESERVED</span>
            </div>
            <div className={styles.divSecondary}>
                <a className={styles.a}>Privacy Policy</a>
                <a className={styles.a}>Terms of Service</a>
                <a className={styles.a}>Shipping Info</a>
                <a className={styles.a}>Contact Us</a>
            </div>
        </footer>
    )

}