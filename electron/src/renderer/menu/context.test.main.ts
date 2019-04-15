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

describe('contextMenu', () => {
  it('can right click', async () => {
    console.log('path', path.join(__dirname, '../../'));
    const app = new Application({
      args: [path.join(__dirname, '../../../')],
      path: path.join(__dirname, '../../../../node_modules/electron/dist/electron'),
    });

    try {
      await app.start();
      console.log('app', app);

      const isVisible = app.browserWindow.isVisible();
      assert.equal(isVisible, true);

      const title = app.client.getTitle();
      assert.equal(title, 'My App');

      await app.stop();
    } catch (error) {
      assert.fail(error);
    }
  });
});
