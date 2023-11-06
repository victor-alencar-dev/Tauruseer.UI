import React, { useContext } from 'react';
import { AccordionContext } from './accordion.component';

export interface IAccordionItemProps {
  children?: React.ReactNode;
  title: string;
  subtitle?: string;
  index: string;
}

export const AccordionItem: React.FC<IAccordionItemProps> = ({
  children,
  title,
  index,
  subtitle,
}) => {
  const { activeIndex, setActiveIndex } = useContext(AccordionContext);
  const isActive = activeIndex === index;

  return (
    <li className={`ts-accordion-item ${isActive && 'ts-accordion-item--active'}`}>
      <div className="ts-accordion-item__header" onClick={() => setActiveIndex(index)}>
        <div className="ts-accordion-item__copy">
          <div className="ts-accordion-item__title">{title}</div>
          {subtitle && <div className="ts-accordion-item__subtitle">{subtitle}</div>}
        </div>
        <div className="ts-accordion-item__icon">
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
      <div className="ts-accordion-item__content-wrapper">
        <div className="ts-accordion-item__content">{children}</div>
      </div>
    </li>
  );
};
