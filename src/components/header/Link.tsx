import React from 'react';
import styles from "./Link.module.css"
import {NavLink} from "react-router-dom";


function Link(props: any) {

    return (
        <>
            <div className={styles.containerForLink}>
                <div className={styles.animation}/>
                <div className={styles.link}>
                    <NavLink className={styles.linkDecor} to={props.link}>{props.name}</NavLink>
                </div>
            </div>

        </>
    );
}

export default Link;