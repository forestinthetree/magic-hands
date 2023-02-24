# Magic Hands 🙌🏼

A remix of human crafted [fluid simulation](https://paveldogreat.github.io/WebGL-Fluid-Simulation/) and machine crafted [hand detection](https://mediapipe-studio.webapps.google.com/demo/gesture_recognizer), by [Forest in the Tree](https://www.forestinthetree.com/).

## Development

### Installation

1. Use correct node version using asdf (or similar):

   1. asdf https://asdf-vm.com/#/core-manage-asdf
   1. asdf-nodejs https://github.com/asdf-vm/asdf-nodejs

1. Install dependencies: `npm install`
1. Run server: `npm start`
1. Open [http://localhost:3000](http://localhost:3000)

### Updating Mediapipe files

The files need to be served in the `public` folder, so when they are updated in `npm`, they also need to be copied over. To do this, run

```bash
npm run copy:mediapipe-wasm
```