import { ExternalServiceAsInt } from '../models/external-dataservice.model';
import { MapEnumToKeyValue, SetFirstLetterToUpperCase } from '../utils/map-enum';
export const DataSourcesMapped = (mappedSources: Array<any>) => {
  if (mappedSources.length) {
    const dataSources = MapEnumToKeyValue(ExternalServiceAsInt).filter((v, i) => {
      return mappedSources.some(
        (d: { externalServiceId: number }) => d.externalServiceId === i + 1,
      );
    });
    console.log('dataSources-dt', dataSources);
    return SetFirstLetterToUpperCase(dataSources);
  }
  return [];
};
