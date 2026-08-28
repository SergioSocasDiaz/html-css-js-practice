import styles from './activityPanel.module.css'
import { Activity } from './Activity.jsx'
export function ActivityPanel({activities}){

    const classContainer = activities.length === 0? `${styles.smallContainer} ${styles.invisible}` : styles.smallContainer
    return(
        <div className={styles.container}>
            <span className={styles.span}>RECENT ACTIVITY</span>
            <div className={classContainer}>
                <ul className={styles.ul}>
                    {activities.map((activity)=>{
                        return(
                            <Activity text={activity.text} key={activity.id}/>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}