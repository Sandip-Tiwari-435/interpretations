// components/Navbar.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useRouter } from 'next/router';
import { capitaliseString } from '../utils/generic';
import { FaGithub} from 'react-icons/fa';

export default function Navbar() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/posts/categories');
      const categoriesData = await res.json();
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  const resetOptions = () => {
    setCategory("all");
    setSearch("");
    setIsMenuOpen(false);
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const currentUrl = router.asPath;
    const newUrl = `/search/${search}/${category}`;

    if (!currentUrl.includes(newUrl)) {
      router.push(newUrl, undefined, { shallow: false });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.mobileHeading}>
        <button className={styles.menuToggle} onClick={toggleMenu}>
          ☰
        </button>
        <div className='modal-heading-custom'>
          <div className={styles.navLogo}>
            <Link href="/home">Interpretations</Link>
          </div>
          <div className='nav-wrapper'>
            <ul className={`${styles.navList}`}>
              <li className={styles.navItem}><Link onClick={resetOptions} href="/home">Home</Link></li>
              <li className={styles.navItem}><Link onClick={resetOptions} href="/about">About Us</Link></li>
              {categories.map((c) => (
                <li key={c.type} className={styles.navItem}><Link onClick={resetOptions} href={`/posts/${c.type}`}>{capitaliseString(c.type)}</Link></li>
              ))}
            </ul>
          </div>
          <div className={styles.searchContainer}>
            <a href="https://github.com/Sandip-Tiwari-435/interpretations" className={styles.gitRepo} target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            <button onClick={handleSearch} className={styles.searchButton}>Search</button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div key="sidebar" className={styles.sidebar}>
          <div className={styles.modalHeadingCustomSidebar}>
            <button className={styles.menuToggle} onClick={toggleMenu}>
              ☰
            </button>
            <div className={styles.logo}>Interpretations</div>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          <button onClick={handleSearch} className={styles.searchButton}>Search</button>
          <nav>
            <div className='nav-wrapper-sidebar'>

              <ul className={styles.navListMobile}>
                <li className={styles.navItem}><Link onClick={resetOptions} href="/home">Home</Link></li>
                <li className={styles.navItem}><Link onClick={resetOptions} href="/about">About Us</Link></li>
                {categories.map((c) => (
                  <li key={c.type} className={styles.navItem}><Link onClick={resetOptions} href={`/posts/${c.type}`}>{`${capitaliseString(c.type)} (${c.count})`}</Link></li>
                ))}
              </ul>
            </div>

          </nav>
        </div>
      )}
    </nav>
  );
}
