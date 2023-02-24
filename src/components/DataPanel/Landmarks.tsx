import { Component, Show, For, createSignal } from "solid-js";
import type { HandData } from "../../utils/mediapipe-tasks-vision";
import styles from "./Landmarks.module.scss";
import { VisualLandmarks } from "./VisualLandmarks";

interface Props {
  handData?: HandData;
}

type NavItem = "data" | "visual";

export const Landmarks: Component<Props> = (props) => {
  const [selectedNav, setSelectedNav] = createSignal<NavItem>("visual");
  const canvasWidth = 380;
  const canvasHeight = 250;

  const navClick = (item: NavItem, event: MouseEvent) => {
    event.preventDefault();
    setSelectedNav(item);
  };

  return (
    <div class={styles.container}>
      <Show
        when={selectedNav() === "data"}
        fallback={
          <VisualLandmarks
            handData={props.handData}
            width={canvasWidth}
            height={canvasHeight}
          />
        }
      >
        <ul class={styles.landmarks}>
          <li>
            <Show when={props.handData?.left} fallback={<em>None</em>}>
              <ul>
                <For each={props.handData?.left?.landmarks}>
                  {(landmark, index) => {
                    const screenX = Math.round(window.innerWidth * landmark.x);
                    const screenY = Math.round(window.innerHeight * landmark.y);
                    const z = Math.round(landmark.z * 1000) / 1000;
                    return (
                      <li>
                        {index}: ({screenX}, {screenY}, {z})
                      </li>
                    );
                  }}
                </For>
              </ul>
            </Show>
          </li>
          <li>
            <Show when={props.handData?.right} fallback={<em>None</em>}>
              <ul>
                <For each={props.handData?.right?.landmarks}>
                  {(landmark, index) => {
                    const screenX = Math.round(window.innerWidth * landmark.x);
                    const screenY = Math.round(window.innerHeight * landmark.y);
                    const z = Math.round(landmark.z * 1000) / 1000;
                    return (
                      <li>
                        {index}: ({screenX}, {screenY}, {z})
                      </li>
                    );
                  }}
                </For>
              </ul>
            </Show>
          </li>
        </ul>
      </Show>
      <nav>
        <ul>
          <li>
            <a
              href="#"
              role="button"
              class={selectedNav() === "data" ? "secondary" : ""}
              onClick={(event) => navClick("data", event)}
            >
              Data
            </a>
          </li>
          <li>
            <a
              href="#"
              role="button"
              class={selectedNav() === "visual" ? "secondary" : ""}
              onClick={(event) => navClick("visual", event)}
            >
              Visual
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
