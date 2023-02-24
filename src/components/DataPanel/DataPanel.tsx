import type { GestureRecognizerResult } from "@mediapipe/tasks-vision";
import { Component, createMemo, Show } from "solid-js";
import { toRoundedPercentage } from "../../utils/math-utils";
import { getHandData } from "../../utils/mediapipe-tasks-vision";
import styles from "./DataPanel.module.scss";
import { Landmarks } from "./Landmarks";

interface Props {
  results?: GestureRecognizerResult;
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
}

export const DataPanel: Component<Props> = (props) => {
  const handData = createMemo(() => {
    return getHandData({ results: props.results, isFlipped: true });
  });

  return (
    <article
      class={`${styles.dataPanel} ${styles[props.position ?? "bottomLeft"]}`}
    >
      <details>
        <summary>Landmarks</summary>
        <Landmarks handData={handData()} />
      </details>
      <details open class={styles.handednessDetails}>
        <summary>Handedness[index]</summary>
        <ul>
          <li>
            <Show when={handData()?.left} fallback={<em>None</em>}>
              Left [{handData()?.left?.index}]:{" "}
              {toRoundedPercentage(handData()?.left?.handedness?.score)}%
            </Show>
          </li>
          <li>
            <Show when={handData()?.right} fallback={<em>None</em>}>
              Right [{handData()?.right?.index}]:{" "}
              {toRoundedPercentage(handData()?.right?.handedness?.score)}%
            </Show>
          </li>
        </ul>
      </details>
      <details open class={styles.gesturesDetails}>
        <summary>Gestures</summary>
        <ul>
          <li>
            <Show when={handData()?.left} fallback={<em>None</em>}>
              {handData()?.left?.gesture?.categoryName}:{" "}
              {toRoundedPercentage(handData()?.left?.gesture?.score)}%
            </Show>
          </li>
          <li>
            <Show when={handData()?.right} fallback={<em>None</em>}>
              {handData()?.right?.gesture?.categoryName}:{" "}
              {toRoundedPercentage(handData()?.right?.gesture?.score)}%
            </Show>
          </li>
        </ul>
      </details>
    </article>
  );
};
