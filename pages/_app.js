// pages/_app.js
import '../styles/globals.css'; // Import your global styles
import { useEffect, useState } from 'react';
import Router from 'next/router';
import Navbar from '../components/Navbar'; // Import your Navbar component
import PostFormModal from '../components/PostFormModal'; // Import your Navbar component
import Loader from '../components/Loader';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      <Navbar />
      { loading ? <Loader /> :
      (<Component {...pageProps} />)
      }<PostFormModal />
      <Footer />
    </>
  );
}

export default MyApp;