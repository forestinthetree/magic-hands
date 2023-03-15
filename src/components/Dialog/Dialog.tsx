import classnames from "classnames";
import { Component, createEffect, JSX } from "solid-js";

import styles from "./Dialog.module.scss";

interface Params {
  class: string;
  children: JSX.Element;
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
}

export const Dialog: Component<Params> = (props) => {
  const closeHandler = () => {
    props.setShowDialog(false);
  };
  const dialogMask = (
    <div class={styles.dialogMask} onClick={closeHandler}></div>
  ) as HTMLElement;

  createEffect(() => {
    if (props.showDialog) {
      document.body.appendChild(dialogMask);
    } else {
      dialogMask?.remove();
    }
  });

  return (
    <div
      class={classnames({
        [styles.dialog]: true,
        [props.class]: true,
        [styles.show]: props.showDialog,
      })}
    >
      <button onClick={closeHandler}>
        <i class="ph ph-x-circle"></i>
      </button>
      {props.children}
    </div>
  );
};
