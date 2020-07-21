import React, {useState} from 'react';
import styles from "./NavBar.module.css"
import Link from "./Link";
import mainFridayImg from "../../images/friday.jpg"

function NavBar(props: any) {

    const [showModal, setShowModal] = useState<boolean>(false);
    const onOpenClick = () => {
        setShowModal(!showModal)
    };

    return (
        <>
            <div className={showModal ? styles.headerShow : styles.header}>
                <div className={styles.containerForImg}>
                    <div className={styles.buttonTopRight}>
                        <button onClick={() => {onOpenClick()}}>{showModal ? "<" : ">"}</button>
                    </div>
                    <div className={styles.photo}>
                        <img src={mainFridayImg}/>
                    </div>
                </div>
                <div className={styles.containerForMenu}>
                    <Link link="./profile" name="Profile"/>
                    <Link link="./login" name="Login"/>
                    <Link link="./registration" name="Registation"/>
                    <Link link="./forgot" name="Forgot"/>
                    <Link link="./tables" name="Tables"/>
                </div>
            </div>
        </>
    );
}

export default NavBar;