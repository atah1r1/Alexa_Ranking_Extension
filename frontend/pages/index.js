import styles from '../styles/Index.module.scss';
import { BiWorld } from "react-icons/bi";
import { MdCopyright } from "react-icons/md";
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { getXML } from '../lib/fetch.lib';
import { GetUrl } from '../src/GetUrl';
const convert = require('xml-js');


export default function Home() {

  const [data, setData] = useState({
    _declaration: {},
    _comment: "",
    ALEXA: {
      _attributes: {},
      SD: [{}, { COUNTRY: { _attributes: { CODE: "", NAME: "", RANK: "" } }, REACH: { _attributes: { RANK: "" } } }]
    }
  });
  const [host, setHost] = useState(null);

  const getData = useCallback(async () => {
    if (typeof window !== 'undefined') {
      try {
        const data = await getXML();
        const result = convert.xml2json(data.toString(), { compact: true, spaces: 4 });
        setData(JSON.parse(result));
        console.log(JSON.parse(result));
      } catch {
        console.log('error')
      }
    }
  }, [])
  useEffect(() => {
    getData();
  }, [host, getData])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { hostname } = new URL(window.location.toString());
      setHost(hostname);
    }
  }, [host])

  const ParseNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <BiWorld size={35} color='#F99939' />
          <h1>{host != null && host}</h1>
        </div>
        <div className={styles.right}>
          <MdCopyright size={20} color='#fff' style={{ marginTop: '2px' }} />
          <h1>Alexa</h1>
        </div>
      </div>
      {
        data.ALEXA.SD[1].COUNTRY &&
        <div className={styles.body}>
          <div>
            <h2>Website Rank</h2>
            <div className={styles.hashtag}>#<span className={styles.rank}> {ParseNumber(data.ALEXA.SD[1].REACH._attributes.RANK)}</span></div>

            <div className={styles.flag}>
              {data.ALEXA.SD[1].COUNTRY._attributes.CODE.length > 0 && getUnicodeFlagIcon(data.ALEXA.SD[1].COUNTRY._attributes.CODE)}
              <span> {data.ALEXA.SD[1].COUNTRY._attributes.NAME}</span>
            </div>
            <div className={styles.hashtag2}>#<span className={styles.rank}> {ParseNumber(data.ALEXA.SD[1].COUNTRY._attributes.RANK)}</span></div>
          </div>
        </div>
      }
      <div className={styles.devider}></div>
      <div className={styles.footer}>
        <p><span>Notice</span>: An unofficial extention for the Alexa Ranking
          <br />developed by Amine TAHIRI (Kapitcha)</p>
      </div>
    </div>
  )
}