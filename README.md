# Tauruseer

## Instalation

Go to `Tauruseer.UI/ui` and install project dependencies.

```bash
npm i
```

Remember, you need a `.env` file in this folder in order to properly run the project. An `.env.dev` file is provided for consulting.

## Execution

Go to `Tauruseer.UI/ui` and run

```bash
npm run dev
```

## Building Icons

Save new icons at `ui/apps/web-app/app/assets/icons/svg` make sure icons are centered, without any white spaces and preferably square (32px by 32px) works best.

Then run:

```bash
npm run icons:build
```

### How do we create new icons?

First we convert the icons into a SVG font file in `ui/apps/web-app/app/assets/icons/output/custom-icons.svg`. Then we use the script `ui/scripts/svgfont-to-css.js` to extract the glyphs and unicode characters to create `ui/apps/web-app/app/assets/icons/output/custom-icons.css` file. We manually created `ui/apps/web-app/app/assets/icons/output/custom-icons-base.css` to load the custom font into the project, and some base classes.

### How to use icons

It should be the same as using FontAwesome Icons but instead of the `fa` classes we use the `ts` prefix (from Tauruseer).

Example. If we add the `tauruseer.svg` file and build the icons then we can add the following classes to render the icon.

```
.ts .ts-tauruseer
```

## Execution PROD mode

first need to have Docker installed on your machine then run

`docker build . -t "ts-remix"`

and then

`docker run -d -p 3000:3000 "ts-remix"`

> you should have set the env variable `CALLBACKURL` set to 3000 port

## License

[MIT](https://choosealicense.com/licenses/mit/)
