import { DeviceType } from '@repo/db';
import { UAParser } from 'ua-parser-js';

export class DeviceUtil {
  static getFriendlyName(userAgentOrResult: string | UAParser.IResult): string {
    let result: UAParser.IResult;

    if (typeof userAgentOrResult === 'string') {
      const parser = new UAParser(userAgentOrResult);
      result = parser.getResult();
    } else {
      result = userAgentOrResult;
    }

    const { browser, os, device, cpu } = result;

    if (device.type && device.vendor && device.model) {
      const osInfo = os.name ? ` (${os.name} ${os.version || ''})` : '';
      return `${getDeviceIcon(device.type)} ${device.vendor} ${device.model}${osInfo}`;
    }

    if (os.name === 'iOS' || os.name === 'Mac OS' || os.name === 'Macintosh') {
      const deviceName = device.model || 'Apple Device';
      const osVer = os.version ? ` ${os.version}` : '';

      if (os.name.includes('Mac')) {
        return `Mac (${os.name}${osVer}) - ${browser.name}`;
      }

      return `${deviceName} (${os.name}${osVer})`;
    }

    if (browser.name && os.name) {
      let cpuInfo = '';

      if (cpu.architecture) {
        cpuInfo = ` [${cpu.architecture}]`;
      }

      return `${browser.name} on ${os.name}${cpuInfo}`;
    }

    if (result.ua.includes('bot') || result.ua.includes('crawl')) {
      return 'Automated Bot';
    }

    return 'Unknown Device';
  }

  static getDeviceType(userAgent: string): DeviceType {
    const parser = new UAParser(userAgent);
    const type = parser.getDevice().type;

    if (type === 'mobile' || type === 'tablet' || type === 'wearable') {
      return 'MOBILE_APP';
    }

    return 'WEB';
  }
}

function getDeviceIcon(type: string | undefined): string {
  switch (type) {
    case 'mobile':
      return '📱';
    case 'tablet':
      return 'ipad';
    case 'smarttv':
      return '📺';
    case 'console':
      return '🎮';
    case 'wearable':
      return '⌚';
    default:
      return '📱';
  }
}
