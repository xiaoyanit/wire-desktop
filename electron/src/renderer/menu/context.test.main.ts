/*
 * Wire
 * Copyright (C) 2019 Wire Swiss GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 *
 */

import * as assert from 'assert';
import * as path from 'path';
import {Application} from 'spectron';

const appBase = path.join(__dirname, '../../../');
const electron = require.resolve('electron', {paths: [appBase]});

describe('contextMenu', () => {
  it('can right click', async () => {
    const app = new Application({
      args: [appBase],
      path: electron as any,
    });

    try {
      await app.start();
      console.log('app', app);

      const isVisible = app.browserWindow.isVisible();
      assert.equal(isVisible, true);

      const title = app.browserWindow.getTitle();
      assert.equal(title, 'My App');

      await app.stop();
    } catch (error) {
      console.error(error);
      assert.fail(error);
    }
  });
});
