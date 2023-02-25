import { Component } from "solid-js";

import styles from "./Footer.module.scss";

export const Footer: Component = () => {
  return (
    <footer class={styles.footer}>
      A remix of human crafted{" "}
      <a href="https://paveldogreat.github.io/WebGL-Fluid-Simulation/">
        fluid simulation
      </a>{" "}
      and machine crafted{" "}
      <a href="https://mediapipe-studio.webapps.google.com/demo/gesture_recognizer">
        hand detection
      </a>
      , by <a href="https://www.forestinthetree.com/">Forest in the Tree</a>
    </footer>
  );
};
