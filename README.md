# Magic Hands 🙌🏼

![Magic Hands image](./public/magic-hands.jpg)

Magic Hands is a digital toy to play with hand movement and computer graphics.

It is a remix of human crafted [fluid simulation](https://paveldogreat.github.io/WebGL-Fluid-Simulation/) and machine crafted [hand detection](https://mediapipe-studio.webapps.google.com/demo/gesture_recognizer), by [Forest in the Tree](https://www.forestinthetree.com/).

You can play with it at: https://magichands.forestinthetree.com/

You can read about it on the [blog post](https://www.forestinthetree.com/blog/magic-hands).

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

## Technology stack

Magic Hands is built using the following tech:

- [WebGL Fluid simulation](https://paveldogreat.github.io/WebGL-Fluid-Simulation/) - visuals
- [MediaPipe studio gesture recognition](https://mediapipe-studio.webapps.google.com/demo/gesture_recognizer) - hand and gesture recognition
- [Astro](https://astro.build/) - web framework
- [SolidJS](https://www.solidjs.com/) - user interface components
- [PicoCSS](https://picocss.com/) - minimal CSS framework
- [Sass](https://sass-lang.com/) - CSS
- [Vercel](https://vercel.com/dashboard) - deployment platform
- [The Web Platform](https://en.wikipedia.org/wiki/Web_platform) - plain old HTML/JavaScript/CSS etc. - no magic there

## License

Magic Hands is open source under the [GNU Affero General Public License Version 3 (AGPLv3)](https://www.gnu.org/licenses/agpl-3.0.en.html) or any later version.

If you contribute to the project, you agree that your contributions will also be licensed under the AGPL v3 License.

If you have any queries, feel free to email [licenses@forestinthetree.com](mailto:licenses@forestinthetree.com).
