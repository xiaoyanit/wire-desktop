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

import * as Electron from 'electron';
import * as path from 'path';

import * as EnvironmentUtil from '../runtime/EnvironmentUtil';

interface WireJson {
  adminUrl: string;
  appBase: string;
  buildNumber: string;
  copyright: string;
  customProtocolName: string;
  description: string;
  electronDirectory: string;
  environment: 'internal' | 'production';
  legalUrl: string;
  licensesUrl: string;
  maximumAccounts: string;
  name: string;
  nameShort: string;
  privacyUrl: string;
  raygunApiKey: string;
  supportUrl: string;
  updateUrl: string;
  version: string;
  websiteUrl: string;
}

const wireJson: WireJson = require('../../wire.json');

const squirrelUpdateInterval = {
  /** 5 minutes */
  DELAY: 5 * 60 * 1000,
  /** 24 hours */
  INTERVAL: 24 * 60 * 60 * 1000,
};

const app = Electron.remote ? Electron.remote.app : Electron.app;

const userDataPath = path.join(app.getPath('userData'));
const logDir = path.join(userDataPath, 'logs');
const appLogFile = path.join(logDir, 'electron.log');

const appPath = path.join(app.getAppPath(), wireJson.electronDirectory);
const iconFileName = `logo.${EnvironmentUtil.platform.IS_WINDOWS ? 'ico' : 'png'}`;
const iconPath = path.join(appPath, 'img', iconFileName);

export const config = {
  ...wireJson,
  appLogFile,
  appPath,
  backendOrigins: ['https://staging-nginz-https.zinfra.io', 'https://prod-nginz-https.wire.com'],
  browserLogFileName: 'console.log',
  iconPath,
  logDir,
  maximumAccounts: parseInt(wireJson.maximumAccounts, 10),
  squirrelUpdateInterval,
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
  userDataPath,
};
