export enum ClientType {
  'webApp',
  'mobile',
}

export type ClientPool = {
  [key in ClientType]: string[];
};

export type SensorsEvent = {
  name: string;
  values: number[];
};

export type ClientRequest = {
  type: ClientType;
};

export type ClientResponse = {
  type: ClientType;
  id: string;
};
