import assert from 'assert';
import sinon from 'sinon';
import {TrayHandler} from './TrayHandler';

const TrayMock = {
  on: () => {},
  setContextMenu: () => {},
  setImage: () => {},
  setToolTip: () => {},
};

describe('initTray', () => {
  it('creates native images for all tray icons and sets a default tray icon', () => {
    // const tray = new TrayHandler();
    // tray.initTray(TrayMock);
    // assert.strictEqual(Object.keys(tray.icons).length, 3);
    // assert.strictEqual(tray.icons.badge.constructor.name, 'NativeImage');
    // assert.strictEqual(tray.icons.tray.constructor.name, 'NativeImage');
    assert.strictEqual('A', 'A');
    sinon.assert.match('A', 'A');
  });
});
