import Slider from "react-slick";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import "slick-carousel/slick/slick.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS default styles

export default function HomepageFeatures(): JSX.Element {
  useEffect(() => {
    AOS.init({
      duration: 2000, // animation duration (default: 400ms)
      once: false, // replay the animation each time the element scrolls into view
    });
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };

  return (
    <div className={styles.wrap}>
      {/* <img src="/img/here_bg.png" alt="" /> */}

      <div className={`${styles.section} ${styles.introBg}`}>
        <div className={styles.sectionInner}>
          <div className={styles.container}>
            <div className={styles.introTitle}>
              {/* The heading is rendered as a background image, so editing this text has no visible effect. */}
              <h3 data-aos="fade-up" data-aos-delay="100">
                XPHERE 2.0
              </h3>
              <h4 data-aos="fade-up" data-aos-delay="200">
                <span>Introduction</span>
              </h4>
              <p data-aos="fade-up" data-aos-delay="300">
                XPHERE is a forward-looking project aiming to maximize the
                practicality of blockchain technology <br />
                through user-friendly design and real-world applications.
              </p>
            </div>
            <Slider {...settings} className={styles.introList}>
              <div
                className={`${styles.introItem} ${styles.item1}`}
                data-aos="fade-up"
                data-aos-delay="0"
              >
                <Link to="/references">
                  <div>
                    <dl>
                      <dt>XPHERE Overview</dt>
                      <dd>
                        Offers API endpoints, SDKs, and essential development
                        materials
                      </dd>
                    </dl>
                  </div>
                </Link>
              </div>

              <div
                className={`${styles.introItem} ${styles.item2}`}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <Link to="/references/public-en">
                  <div>
                    <dl>
                      <dt>Public JSON-RPC Endpoint</dt>
                      <dd>
                        Public endpoints to connect with the XPHERE network
                      </dd>
                    </dl>
                  </div>
                </Link>
              </div>
              <div
                className={`${styles.introItem} ${styles.item3}`}
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <Link to="/references/javascript-api">
                  <div>
                    <dl>
                      <dt>JavaScript API Libraries</dt>
                      <dd>
                        Details on JavaScript APIs for XPHERE communication
                      </dd>
                    </dl>
                  </div>
                </Link>
              </div>
              <div
                className={`${styles.introItem} ${styles.item4}`}
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <Link to="/references/json-rpc">
                  <div>
                    <dl>
                      <dt>JSON-RPC API</dt>
                      <dd>Documentation for Xphere’s JSON-RPC API</dd>
                    </dl>
                  </div>
                </Link>
              </div>
            </Slider>
          </div>
        </div>
      </div>

      <div className={`${styles.section} ${styles.techBg}`}>
        <div className={styles.sectionInner}>
          <div className={styles.container}>
            <div className={styles.techTitle}>
              <h3 data-aos="fade-up" data-aos-delay="200">
                <span>
                  Technical Structure <br />
                  and Operation Principles
                </span>
              </h3>
              <p data-aos="fade-up" data-aos-delay="400">
                The XPHERE blockchain combines distributed ledger and
                cryptographic technologies to overcome the limitations of
                centralized systems through innovative efforts.
              </p>
            </div>
            <div className={styles.pps}>
              <h3
                className={styles.xphTitle}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <span>
                  <strong>Purpose</strong>
                </span>
              </h3>
              <ul className={styles.ppsList}>
                <li data-aos="fade-up" data-aos-delay="200">
                  <dl>
                    <dt></dt>
                    <dd>
                      <h5>Fast Finality</h5>
                      <p>
                        A PBFT Main Chain finalizes blocks in roughly one
                        second, with no probabilistic confirmation wait
                      </p>
                    </dd>
                  </dl>
                </li>
                <li data-aos="fade-up" data-aos-delay="400">
                  <dl>
                    <dt></dt>
                    <dd>
                      <h5>Support for DApp Ecosystem</h5>
                      <p>
                        Full EVM compatibility, so Solidity contracts and
                        Ethereum tooling work without modification
                      </p>
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.section} ${styles.featBg}`}>
        <div className={styles.sectionInner}>
          <div className={styles.container}>
            <h3
              className={styles.xphTitle}
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <span>
                <strong>Main Features of XPHERE Mainnet 2.0</strong>
              </span>
            </h3>
            <ul className={styles.featList}>
              <li data-aos="fade-up" data-aos-delay="200">
                <dl>
                  <dt>
                    <img src="/img/feature_1.png" alt="" />
                  </dt>
                  <dd>
                    High-Speed <br />
                    Transactions
                  </dd>
                </dl>
              </li>
              <li data-aos="fade-up" data-aos-delay="400">
                <dl>
                  <dt>
                    <img src="/img/feature_2.png" alt="" />
                  </dt>
                  <dd>Energy-Efficient Consensus Algorithm</dd>
                </dl>
              </li>
              <li data-aos="fade-up" data-aos-delay="600">
                <dl>
                  <dt>
                    <img src="/img/feature_3.png" alt="" />
                  </dt>
                  <dd>Smart Contracts</dd>
                </dl>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`${styles.section} ${styles.guideBg}`}>
        <div className={styles.sectionInner}>
          <div className={styles.container}>
            <h3
              className={styles.xphTitle}
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <span>
                <strong>XPHERE Guides</strong>
              </span>
            </h3>
            <ul className={styles.guideList}>
              <li data-aos="fade-up" data-aos-delay="200">
                <dl>
                  <dt></dt>
                  <dd>
                    <h5>ZIGAP Wallet</h5>
                    <p>
                      Create an XPHERE wallet with ZIGAP to hold XP and receive
                      mining or staking payouts.
                    </p>
                    <a href="https://about.zigap.io/" target="_blank" rel="noopener noreferrer">
                      <span>
                        <strong>ZIGAP Download</strong>
                      </span>
                    </a>
                  </dd>
                </dl>
              </li>
              <li data-aos="fade-up" data-aos-delay="400">
                <dl>
                  <dt></dt>
                  <dd>
                    <h5>Mining</h5>
                    <p>
                      XPHERE mining runs on the IceRiver XP0 xpHash ASIC. See
                      the mining guide to get started.
                    </p>
                    <Link to="/mining">
                      <span>
                        <strong>Mining guide</strong>
                      </span>
                    </Link>
                  </dd>
                </dl>
              </li>
              <li data-aos="fade-up" data-aos-delay="600">
                <dl>
                  <dt></dt>
                  <dd>
                    <h5>XPScan (XPHERE)</h5>
                    <p>
                      Track blocks, transactions, and network stats on XPScan,
                      the XPHERE blockchain explorer
                    </p>
                    <a href="https://xpscan.io" target="_blank" rel="noopener noreferrer">
                      <span>
                        <strong>Go to XPScan</strong>
                      </span>
                    </a>
                  </dd>
                </dl>
              </li>
              <li data-aos="fade-up" data-aos-delay="800">
                <dl>
                  <dt></dt>
                  <dd>
                    <h5>Tamsa Explorer (XPHERE)</h5>
                    <p>
                      Explore your token transactions and monitor Blockchain
                      activity with Tamsa Explorer
                    </p>
                    <a href="https://xp.tamsa.io" target="_blank" rel="noopener noreferrer">
                      <span>
                        <strong>Go to Explorer</strong>
                      </span>
                    </a>
                  </dd>
                </dl>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`${styles.section} ${styles.keyBg}`}>
        <div className={styles.sectionInner}>
          <div className={styles.container}>
            <h3
              className={styles.xphTitle}
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <span>
                <strong>Key Components</strong>
              </span>
            </h3>
            <ul className={styles.keyList}>
              <li data-aos="fade-up" data-aos-delay="200">
                <dl>
                  <dt>User-Centric Design</dt>
                  <dd>
                    XPHERE aims to provide a platform that users can intuitively
                    understand and use, transforming blockchain technology into
                    an everyday tool.
                  </dd>
                </dl>
              </li>
              <li data-aos="fade-up" data-aos-delay="400">
                <dl>
                  <dt>Global WEB 3.0 Integrated Ecosystem</dt>
                  <dd>
                    XPHERE connects wallets, explorers, staking, and dApps into
                    a single EVM-compatible environment, so tools built for
                    Ethereum work here without modification.
                  </dd>
                </dl>
              </li>
              <li data-aos="fade-up" data-aos-delay="600">
                <dl>
                  <dt>Innovative Technological Advancement</dt>
                  <dd>
                    Through continuous technological advancement and innovative
                    approaches, XPHERE overcomes the limitations of blockchain
                    technology and explores new possibilities.
                  </dd>
                </dl>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.aside}>
        <ul>
          <li>
            <a href="https://x.com/Xphere_official" target="_blank" rel="noopener noreferrer">
              X
            </a>
          </li>
          <li>
            <a href="https://t.me/Xphere_official" target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
          </li>
          {/* <li>
            <a href="https://medium.com/@Xphere_official" target="_blank" rel="noopener noreferrer">
              Medium
            </a>
          </li> */}
          <li>
            <a href="https://discord.gg/xphere" target="_blank" rel="noopener noreferrer">
              discord
            </a>
          </li>
          <li>
            <a href="https://github.com/xpherechain" target="_blank" rel="noopener noreferrer">
              Github
            </a>
          </li>
        </ul>
      </div>

      <div className={styles.fixLogo}>
        <h3>x-phere</h3>
      </div>
    </div>
  );
}
