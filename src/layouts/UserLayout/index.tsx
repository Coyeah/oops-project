/*
 * @Author: ye.chen
 * @Date: 2020-04-02 17:48:08
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-16 17:42:56
 */
import React, { useEffect } from 'react';
import Parallax from 'parallax-js';

import styles from './index.less';

let images: { [name: string]: string } = {};
['astronaut', 'asteroid', 'star1', 'robot', 'star2', 'star3', 'planet', 'star4', 'star5'].forEach(
  (key) => {
    images[key] = require(`@/assets/universe/${key}.png`).default;
  },
);

const Background: React.FC = (props) => {
  useEffect(() => {
    for (let i = 0; i < 9; i++) {
      let el = document.getElementById('scene' + (i + 1));
      new Parallax(el, {
        relativeInput: true,
      });
    }
  }, []);

  return (
    <div className={styles.layout}>
      <div id="scene9" className={styles.scene} style={{ left: '7%', top: '15%' }}>
        <img src={images.planet} data-depth="0.3" alt="" />
      </div>
      <div id="scene1" className={styles.scene} style={{ left: '80%', top: '45%' }}>
        <img src={images.astronaut} data-depth="0.2" alt="" />
      </div>
      <div id="scene2" className={styles.scene} style={{ left: '70%', top: '70%' }}>
        <img src={images.asteroid} data-depth="0.4" alt="" />
      </div>
      <div id="scene3" className={styles.scene} style={{ left: '85%', top: '80%' }}>
        <img src={images.star1} data-depth="0.3" alt="" />
      </div>
      <div id="scene4" className={styles.scene} style={{ left: '68%', top: '60%' }}>
        <img src={images.robot} data-depth="0.7" alt="" />
      </div>
      <div id="scene5" className={styles.scene} style={{ left: '72%', top: '40%' }}>
        <img src={images.star2} data-depth="0.6" alt="" />
      </div>
      <div id="scene6" className={styles.scene} style={{ left: '15%', top: '65%' }}>
        <img src={images.star3} data-depth="0.4" alt="" />
      </div>
      <div id="scene7" className={styles.scene} style={{ left: '30%', top: '35%' }}>
        <img src={images.star4} data-depth="0.4" alt="" />
      </div>
      <div id="scene8" className={styles.scene} style={{ left: '10%', top: '55%' }}>
        <img src={images.star5} data-depth="0.5" alt="" />
      </div>
      <div className={styles.main}>{props.children}</div>
    </div>
  );
};

export default Background;
