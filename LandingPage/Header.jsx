import styles from './Header.module.css';

const Header = () => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.menuButton}>Меню</div>
            <div className={styles.menuButton}>Главная</div>
            <div className={styles.menuButton}>О нас</div>
        </div>
    );
};

export default Header;
