import workstationNames from '@/config/workstations';

class Zerotier {
  private apiKey: string;
  private endpoints: { [key: string]: string };
  private authorizationHeader: string;
  public baseEndpoint = 'https://api.zerotier.com/api/v1';

  private networkId: string;

  constructor(apiKey: string, networkId: string) {
    this.apiKey = apiKey;
    this.authorizationHeader = `token ${this.apiKey}`;
    this.networkId = networkId;
    this.endpoints = this.getEndpoints();
  }

  private getEndpoints() {
    return {
      network: `${this.baseEndpoint}/network`,
      'network-member': `${this.baseEndpoint}/network/${this.networkId}/member`,
    };
  }

  public async checkApiKey() {
    const response = await fetch(this.endpoints.network, {
      headers: {
        Authorization: this.authorizationHeader,
      },
    });
    if (!response.ok) {
      throw new Error('Invalid API key');
    }
  }

  public async getNetworkMembers() {
    const response = await fetch(this.endpoints['network-member'], {
      headers: {
        Authorization: this.authorizationHeader,
      },
    });
    const data = await response.json();
    return data;
  }

  public async getNetworks() {
    const response = await fetch(this.endpoints.network, {
      headers: {
        Authorization: this.authorizationHeader,
      },
    });
    const data = await response.json();
    return data;
  }

  public async getWorkstations() {
    const networkMembers = await this.getNetworkMembers();
    const workstations = networkMembers.filter((member) => {
      return workstationNames.includes(member.name);
    });
    return workstations;
  }
}

export default Zerotier;
