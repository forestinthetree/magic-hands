import { Component, JSX, Show, createSignal } from "solid-js";
import styles from "./Alert.module.scss";

interface Props {
  children: JSX.Element | string;
  type?: "error";
}

export const Alert: Component<Props> = (props) => {
  const [isOpen, setIsOpen] = createSignal(true);
  return (
    <Show when={isOpen()}>
      <div class={`${styles.alert} ${props.type ? styles[props.type] : ""}`}>
        {props.children}
        <button class={styles.closeButton} onClick={() => setIsOpen(false)}>
          <i class="ph ph-x-circle"></i>
        </button>
      </div>
    </Show>
  );
};
