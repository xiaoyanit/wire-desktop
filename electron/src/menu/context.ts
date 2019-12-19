/*
 * Wire
 * Copyright (C) 2018 Wire Swiss GmbH
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

import {ipcRenderer, MenuItem, WebContents} from 'electron';
import contextMenu = require('electron-context-menu');
import axios, {AxiosRequestConfig} from 'axios';

import {EVENT_TYPE} from '../lib/eventType';
import * as locale from '../locale/locale';
import * as EnvironmentUtil from '../runtime/EnvironmentUtil';
import {config} from '../settings/config';

export function attachContextMenu(webContents: WebContents) {
  contextMenu({
    menu: (defaultActions, params, browserWindow) => {
      if (params.isEditable) {
        return [
          new MenuItem({
            enabled: params.editFlags.canCut,
            label: locale.getText('menuCut'),
            role: 'cut',
          }),
          new MenuItem({
            enabled: params.editFlags.canCopy,
            label: locale.getText('menuCopy'),
            role: 'copy',
          }),
          new MenuItem({
            enabled: params.editFlags.canPaste,
            label: locale.getText('menuPaste'),
            role: 'paste',
          }),
          new MenuItem({
            type: 'separator',
          }),
          new MenuItem({
            enabled: params.editFlags.canSelectAll,
            label: locale.getText('menuSelectAll'),
            role: 'selectAll',
          }),
        ];
      }

      if (params.hasImageContents) {
        return [
          new MenuItem({
            click: () => savePicture(params.srcURL.replace(/^blob:/, ''), 'test'),
            label: locale.getText('menuSavePictureAs'),
          }),
        ];
      }

      return [];
    },
    showCopyImage: false,
    showInspectElement: EnvironmentUtil.app.IS_DEVELOPMENT,
    showLookUpSelection: false,
    showServices: false,
    window: webContents as any,
  });
}

const savePicture = async (url: string, timestamp?: string): Promise<void> => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'User-Agent': config.userAgent,
    },
    method: 'get',
    responseType: 'arraybuffer',
    url,
  };
  const {data: buffer} = await axios.get<Buffer>(url, axiosConfig);
  return ipcRenderer.send(EVENT_TYPE.ACTION.SAVE_PICTURE, new Uint8Array(buffer), timestamp);
};
