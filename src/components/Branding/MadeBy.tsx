import classnames from "classnames";
import type { Component } from "solid-js";
import styles from "./MadeBy.module.scss";

interface Props {
  class?: string;
}

export const MadeBy: Component<Props> = (props) => {
  return (
    <p class={classnames(styles.madeBy, props.class)}>
      Made with <i class="ph ph-heart"></i> by{" "}
      <a href="https://www.forestinthetree.com/">Forest in the Tree</a>
    </p>
  );
};
