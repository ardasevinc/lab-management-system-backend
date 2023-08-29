import Zerotier from '@/services/zerotier';
import 'dotenv/config';
import workstationNames from '@/config/workstations';

describe('zerotier service', () => {
  it('should initialize', () => {
    const zerotier = new Zerotier(
      process.env.ZEROTIER_API_KEY as string,
      process.env.ZEROTIER_NETWORK_ID as string,
    );
    expect(zerotier).toBeDefined();
  });

  it('should have a working api key', async () => {
    const zerotier = new Zerotier(
      process.env.ZEROTIER_API_KEY as string,
      process.env.ZEROTIER_NETWORK_ID as string,
    );
    expect(zerotier.checkApiKey()).resolves.not.toThrow();
  });

  it('should get networks', async () => {
    const zerotier = new Zerotier(
      process.env.ZEROTIER_API_KEY as string,
      process.env.ZEROTIER_NETWORK_ID as string,
    );
    expect(zerotier.getNetworks()).resolves.toBeDefined();
    const networks = await zerotier.getNetworks();
    expect(networks.length).toBeGreaterThan(0);
  });

  it('should get network members', async () => {
    const zerotier = new Zerotier(
      process.env.ZEROTIER_API_KEY as string,
      process.env.ZEROTIER_NETWORK_ID as string,
    );
    expect(zerotier.getNetworkMembers()).resolves.toBeDefined();
    const networkMembers = await zerotier.getNetworkMembers();
    expect(networkMembers.length).toBeGreaterThan(0);
  });

  it('should get correct workstations', async () => {
    const zerotier = new Zerotier(
      process.env.ZEROTIER_API_KEY as string,
      process.env.ZEROTIER_NETWORK_ID as string,
    );
    expect(zerotier.getWorkstations()).resolves.toBeDefined();
    const workstations = await zerotier.getWorkstations();
    expect(workstations.length).toBeGreaterThan(0);
    expect(
      workstations.every((workstation) =>
        workstationNames.includes(workstation.name),
      ),
    ).toBe(true);
  });
});
