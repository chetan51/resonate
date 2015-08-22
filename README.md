# Usage

Open `index.html` in your browser.

## Tips and Tricks

### Multiple Mathboxes overlaid on each other

- Put each Mathbox in its own element
- Overlay elements on each other
- Change `tQuery.World.registerInstance` call in Mathbox code:

    this._renderer.setClearColorHex( 0xFFFFFF, 1 );

to

    this._renderer.setClearColorHex( 0x000000, 0 );
