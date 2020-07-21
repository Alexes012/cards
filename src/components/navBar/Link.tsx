import React from 'react';
import styles from "./NavBar.module.css"
import {NavLink} from "react-router-dom";


function Link(props: any) {

    return (
        <>
            <div className={styles.containerForLink}>
                <div className={styles.animation}/>
                <div className={styles.link}>
                    <NavLink to={props.link}>{props.name}</NavLink>
                </div>
            </div>

        </>
    );
}

export default Link;