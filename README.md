# Magic Hands 🙌🏼

![Magic Hands image](./images/magic-hands.jpg)

Magic Hands is a digital toy to play with hand movement and computer graphics.

It is a remix of human crafted [fluid simulation](https://paveldogreat.github.io/WebGL-Fluid-Simulation/) and machine crafted [hand detection](https://mediapipe-studio.webapps.google.com/demo/gesture_recognizer), by [Forest in the Tree](https://www.forestinthetree.com/).

You can play with it at: https://magichands.forestinthetree.com/

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

## Debugging

To show the debug panel for hand detection, add `?debug=true` to the URL.

## License

Magic Hands is open source under the [GNU Affero General Public License Version 3 (AGPLv3)](https://www.gnu.org/licenses/agpl-3.0.en.html) or any later version.

If you contribute to the project, you agree that your contributions will also be licensed under the AGPL v3 License.

If you have queries, feel free to email [licenses@forestinthetree.com](mailto:licenses@forestinthetree.com).
