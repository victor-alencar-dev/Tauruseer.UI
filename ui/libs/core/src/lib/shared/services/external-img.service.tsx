import classNames from 'classnames';
import * as React from 'react';
import { ExternalService } from '../models/external-dataservice.model';
import { ExternalDataSource } from '../models/external-datasource.model';
import { serviceDescriptionsIcons } from '../models/external-icon-source.model';

export interface IExternalServiceImgProps extends React.HTMLProps<HTMLImageElement> {
  service: ExternalDataSource;
}

interface IExternalServiceIconProps {
  projectType: string | any;
  className?: any;
  style?: object | undefined;
}

const fixName = (name: string) => {
  return name === 'Docio API'
    ? 'Tauruseer API'
    : name === 'Docio Scanner'
    ? 'Tauruseer Scanner'
    : name;
};

export function ExternalServiceImg(props: IExternalServiceImgProps) {
  const { service, crossOrigin, ...rest } = props; // HACK.PI: crossOrigin added here because of @types incompatibility
  const name = fixName(service.name);
  const imgPath = service.imgPath.split('/');

  return <img src={`/${imgPath[2]}`} alt={name} title={name} {...rest} />;
}

export function ExternalServiceIcon({ projectType, className, style }: IExternalServiceIconProps) {
  const project = projectType.split(' ');
  const iconName = Object.keys(ExternalService).filter((i) => project[0] === i);
  const icon = serviceDescriptionsIcons[`${iconName}`];
  const iconClassName = classNames(icon, className);

  return <i className={iconClassName} style={style}></i>;
}
