import React from 'react';

export interface IAccordionProps {
  children?: React.ReactNode;
  defaultActiveIndex?: string;
}

export const AccordionContext = React.createContext<{
  activeIndex: string;
  setActiveIndex: (index: string) => void;
}>({
  activeIndex: '0',
  setActiveIndex: (index: string) => {},
});

export const Accordion: React.FC<IAccordionProps> = ({ children, defaultActiveIndex }) => {
  const [activeIndex, setActiveIndex] = React.useState(defaultActiveIndex || '0');

  return (
    <AccordionContext.Provider value={{ activeIndex, setActiveIndex }}>
      <ul className="ts-accordion">{children}</ul>
    </AccordionContext.Provider>
  );
};
