import React from "react";
import styles from './Header.module.css'
import Link from "./Link";
import mainFridayImg from "../../images/friday.jpg"

class Header extends React.Component {
    render() {
        return (
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.logo}>
                        <img src={mainFridayImg}/>
                    </div>
                    <div className={styles.nameOfPages}>
                        <Link link="./profile" name="Profile"/>
                        <Link link="./decks" name="Decks"/>
                        <Link link="./registration" name="Registation"/>
                        <Link link="./forgot" name="Forgot"/>
                        <Link link="./login" name="Login"/>
                    </div>
                    <div className={styles.phone}>
                        <div className={styles.borderPhone}>ava+nick profile</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;