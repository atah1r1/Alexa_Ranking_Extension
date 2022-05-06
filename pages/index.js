import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Index.module.scss';
import { BiWorld } from "react-icons/bi";
import { MdCopyright } from "react-icons/md";
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { useEffect } from 'react';
import { getXML } from '../lib/fetch.lib';


export default function Home() {
  // useEffect(() => {
  //   getXML();
  // }, [])
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <BiWorld size={35} color='#F99939' />
          <h1>google.com</h1>
        </div>
        <div className={styles.right}>
          <MdCopyright size={20} color='#fff' style={{ marginTop: '2px' }} />
          <h1>Alexa</h1>
        </div>
      </div>
      <div className={styles.body}>
        <div>
          <h2>Website Rank</h2>
          <div className={styles.hashtag}>#<span className={styles.rank}> 132,942</span></div>

          <div className={styles.flag}>
            {getUnicodeFlagIcon('US')} <span> United states</span>
          </div>
          <div className={styles.hashtag2}>#<span className={styles.rank}> 132,942</span></div>
        </div>
      </div>
      <div className={styles.devider}></div>
      <div className={styles.footer}>
        <p><span>Notice</span>: An unofficial extention for the Alexa Ranking
          <br />developed by Amine TAHIRI (Kapitcha)</p>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://data.alexa.com/data?cli=10&dat=s&url=http://facebook.com/`)
  const data = await res.text()
  console.log(data);

  // Pass data to the page via props
  return { props: { } }
}