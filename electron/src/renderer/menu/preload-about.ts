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

import {IpcMessageEvent, ipcRenderer} from 'electron';

import {TranslationLabel} from '../../interfaces';
import {i18nLanguageIdentifier} from '../../interfaces/locale';
import {EVENT_TYPE} from '../../lib/eventType';
import {WireJson} from '../../settings/config';

ipcRenderer.once(EVENT_TYPE.ABOUT.LOCALE_RENDER, (event: IpcMessageEvent, labels: Record<string, 'text' | 'href'>) => {
  for (const entry in Object.entries(labels)) {
    const [label, type] = entry;
    const labelElement = document.querySelector(`[data-string="${label}"]`);
    if (labelElement) {
      if (type === 'text') {
        (labelElement as HTMLDivElement).innerHTML = labels[label];
      } else if (type === 'href') {
        (labelElement as HTMLAnchorElement).href = labels[label];
      }
    }
  }
});

interface Details {
  copyright: string;
  electronVersion: string;
  productName: string;
  webappVersion: string;
}

export function loadedAboutScreen(event: Event, details: Details): void {
  const nameElement = document.getElementById('name');
  if (nameElement) {
    nameElement.innerHTML = details.productName;
  }

  const versionElement = document.getElementById('version');
  if (versionElement) {
    versionElement.innerHTML = details.electronVersion;
  }

  const webappVersionElement = document.getElementById('webappVersion');
  if (webappVersionElement) {
    webappVersionElement.innerHTML = details.webappVersion;
  }

  const copyrightElement = document.getElementById('copyright');
  if (copyrightElement) {
    copyrightElement.innerHTML = details.copyright;
  }

  const logoElement = document.getElementById('logo') as HTMLImageElement;
  if (logoElement) {
    logoElement.src = '../img/logo.256.png';
  }

  // Get locales
  const labels: TranslationLabel[] = [];
  const dataStrings = document.querySelectorAll<HTMLDivElement>('[data-string]');

  for (const index in dataStrings) {
    const label = dataStrings[index];
    if (label.dataset) {
      labels.push({identifier: label.dataset.string as i18nLanguageIdentifier, type: 'string'});
    }
  }

  const dataLinks = document.querySelectorAll<HTMLAnchorElement>('[data-href]');

  for (const index in dataLinks) {
    const label = dataLinks[index];
    if (label.dataset) {
      labels.push({identifier: label.dataset.href as keyof WireJson, type: 'href'});
    }
  }

  ipcRenderer.send(EVENT_TYPE.ABOUT.LOCALE_VALUES, labels);
}

ipcRenderer.once(EVENT_TYPE.ABOUT.LOADED, loadedAboutScreen);
