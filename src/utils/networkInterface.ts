import os from 'os'

const ifaces = os.networkInterfaces();

let ipv4 = {
  interface: '',
  ipAddress: ''
}

Object.keys(ifaces).forEach(function (ifname: string) : void {
  let alias = 0;

  ifaces[ifname]?.forEach(function (iface : any) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(
        'This interface has multiple ipv4 Addresses !!',
        ifname + ':' + alias, iface.address,
        'Please contact the server Admin ...'
      );
    } else {
      // this interface has only one ipv4 adress
      // console.log(ifname, iface.address);
      ipv4 = {
        interface: ifname,
        ipAddress: iface.address
      }
    }
    ++alias;
  });
});

export function getIpInfo() : string {
  return ipv4.ipAddress
}

export function getIpInterface() : string {
  return ipv4.interface
}