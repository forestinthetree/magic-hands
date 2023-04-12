import { Alert } from "../Alert/Alert";

const BUGS_DISCUSSION_LINK =
  "https://www.notion.so/taktran/Magic-Hands-Public-Discussion-2304ea6de3a24115b754020b80ee98c6?pvs=4#0d4cae9d55594f9da19ad658c3509057";

export const ErrorAlert = (props: { error: string }) => (
  <Alert type="error">
    <p>Sorry, there has been an error: {props.error}</p>
    <p>
      Feel free to add to the <a href={BUGS_DISCUSSION_LINK}>discussion</a>{" "}
      about it.
    </p>
  </Alert>
);
