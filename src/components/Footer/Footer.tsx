import { Component } from "solid-js";

import styles from "./Footer.module.scss";

export const Footer: Component = () => {
  return (
    <footer class={styles.footer}>
      Made with <i class="ph ph-heart"></i> by{" "}
      <a href="https://www.forestinthetree.com/">Forest in the Tree</a>
    </footer>
  );
};
