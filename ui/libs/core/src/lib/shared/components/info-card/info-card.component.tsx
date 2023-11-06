import { createContext, useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Chip, TChipModifier, TChipType } from '../chip.component';
import { FaIcon } from '../icon.component';
import * as React from 'react';
import { CustomLink } from '../customLink.component';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { CopyTextToClipboard } from '../copy-text-to-clipboard.component';
import { InfoCardTable, TInfoCardTableProps } from './info-card-table/info-card-table.component';
import { TTableData, TTableField } from './info-card-table/info-card-table.component';
import { Button } from '@progress/kendo-react-buttons';

export { TTableData, TTableField };

export type TInfoCardBreadcrumbs = {
  copy: string;
  url?: string;
  icon?: string;
};

type InfoCardHeaderProps = {
  title: string;
  url?: string;
  subtitle?:
    | string
    | {
        path: string;
        shortPath: string;
        project: string;
      };

  breadcrumbs?: TInfoCardBreadcrumbs[] | null;
  actions?: {
    copy: string;
    intent?: string; // intent is triggered on actions
    url?: string;
    onClick?: () => void;
  }[];
};

type InfoCardSidebarProps = {
  items: {
    type: TChipType | 'icon';
    icon?: string;
    iconColor?: string;
    copy?: string;
    title: string;
    modifier?: TChipModifier;
  }[];
};

type InfoCardReferencesProps = {
  items: {
    url: string;
    copy: string;
    description: string;
  }[];
};

type InfoCardTextboxProps = {
  html?: string;
  content?: React.ReactNode;
  action?: {
    icon: string;
    copy: string;
    onClick: () => void;
  };
};

export type InfoCardProps = {
  header: InfoCardHeaderProps;
  sideBar?: InfoCardSidebarProps;
  table?: TInfoCardTableProps;
  references?: InfoCardReferencesProps;
  textbox?: InfoCardTextboxProps;
  state?: 'New' | 'InProcess' | 'RiskAccepted';
};

const stateText: { [arg: string]: string } = {
  New: 'New',
  InProcess: 'In Progress',
  RiskAccepted: 'Risk Accepted',
};

export const InfoCardContext = createContext<InfoCardProps | null>(null);

const InfoCardHeader: React.FC = () => {
  const content = useContext(InfoCardContext);

  const ChipMapping: { [arg: string]: { type: TChipType; modifier: TChipModifier } } = {
    New: {
      type: 'status',
      modifier: 'secondary',
    },
    InProcess: {
      type: 'status',
      modifier: 'primary',
    },
    RiskAccepted: {
      type: 'status',
      modifier: 'error',
    },
  };

  return content?.header ? (
    <header className="info-card-header">
      <div className="info-card-header__content">
        {content?.state && (
          <div className="info-card-header__state">
            <Chip
              copy={stateText[content.state]}
              type={ChipMapping[content.state].type}
              modifier={ChipMapping[content.state].modifier}
            />
          </div>
        )}
        {/* Title component */}
        {content?.header?.url ? (
          <CustomLink to={content.header.url} className="info-card-header__title">
            <Tooltip anchorElement="target" position="top">
              <h2 title={`Open ${content.header.url}`}>
                {content.header.title}
                <FaIcon
                  icon="arrow-up-right-from-square"
                  classes="info-card-header__title-icon"
                  size={20}
                />
              </h2>
            </Tooltip>
          </CustomLink>
        ) : (
          <h2>{content.header.title}</h2>
        )}
        {/* Subtitle component */}
        {content.header.subtitle && (
          <div className="info-card-header__subtitle">
            {typeof content.header.subtitle === 'string' ? (
              <p>{content.header.subtitle}</p>
            ) : (
              <>
                <div className="info-card-header__subtitle--strong">{`${content.header.subtitle.project} /`}</div>
                <Tooltip anchorElement="target" position="top">
                  <div title={`Copy path: ${content.header.subtitle.path}`}>
                    <CopyTextToClipboard
                      copyText={content.header.subtitle.path}
                      alertMessage={'Copied to clipboard'}
                    >
                      {`${content.header.subtitle.shortPath}  `} <FaIcon icon="copy" size={16} />
                    </CopyTextToClipboard>
                  </div>
                </Tooltip>
              </>
            )}
          </div>
        )}
        {/* Ticket Breadcrumb component */}
        {content.header.breadcrumbs && (
          <div className="info-card-header__breadcrumbs">
            {content.header.breadcrumbs.map((bc, i) => (
              <Chip
                key={i}
                icon={bc.icon}
                copy={bc.copy}
                type="breadcrumb"
                url={bc.url}
                iconRight={bc.url && 'chevron-right'}
              />
            ))}
          </div>
        )}
      </div>
      {content.header.actions && (
        <div className="info-card-header__actions">
          {content.header.actions.map((action, i) =>
            action.url ? (
              <CustomLink key={i} to={action.url} className="text-decoration-none">
                <Button className="button button-secondary text-md ">{action.copy}</Button>
              </CustomLink>
            ) : (
              <Button
                key={i}
                className="button button-secondary text-md"
                onClick={() => action.onClick && action.onClick()}
              >
                {action.copy}
              </Button>
            ),
          )}
        </div>
      )}
    </header>
  ) : null;
};

const InfoCardSidebar: React.FC = () => {
  const content = useContext(InfoCardContext);
  return content?.sideBar ? (
    <div className="info-card-sidebar">
      {content.sideBar.items.map((item, i) => (
        <div className="info-card-sidebar__item" key={i}>
          <h3 className="info-card-sidebar__item-title">{item.title}</h3>
          {item.type === 'icon' && item.icon && (
            <FaIcon icon={item.icon} size={38} style={{ color: item.iconColor }} />
          )}
          {item.type !== 'icon' && item.copy && (
            <Chip
              key={i}
              icon={item.icon}
              type={item.type}
              copy={item.copy}
              modifier={item.modifier}
            />
          )}
        </div>
      ))}
    </div>
  ) : null;
};

const InfoCardTextbox: React.FC = () => {
  const content = useContext(InfoCardContext);

  return content?.textbox ? (
    <>
      <div className="info-card-textbox">
        <h3 className="info-card-textbox__title">Description</h3>
        {content.textbox.html && (
          <div
            className="info-card-textbox__content"
            dangerouslySetInnerHTML={{ __html: content.textbox.html }}
          />
        )}
        {content.textbox.content && (
          <div className="info-card-textbox__content">{content.textbox.content}</div>
        )}
      </div>
      {content.textbox.action && (
        <button
          title={content.textbox.action?.copy}
          className="info-card-textbox__button"
          onClick={content.textbox.action.onClick}
        >
          <Tooltip anchorElement="target" position="top">
            <FaIcon icon={content.textbox.action.icon} size={18} />
          </Tooltip>
        </button>
      )}
    </>
  ) : null;
};

const InfoCardReferences: React.FC = () => {
  const content = useContext(InfoCardContext);
  return content?.references ? (
    <div className="info-card-references">
      <h3 className="info-card-references__title">Reference Links</h3>
      {content.references.items.map((item, i) => (
        <p className="info-card-references__item" key={i}>
          <CustomLink to={item.url}>
            <span>{item.copy}</span>
          </CustomLink>
          <FaIcon icon="pipe" classes="info-card-references__separator" />
          <span>{item.description}</span>
        </p>
      ))}
    </div>
  ) : null;
};

export const InfoCard: React.FC<{ content: InfoCardProps }> = ({ content }) => {
  return (
    <InfoCardContext.Provider value={content}>
      <Card>
        <InfoCardHeader />
        <main className="info-card__main">
          <InfoCardSidebar />
          <InfoCardTextbox />
          <InfoCardTable />
        </main>
        <footer className="info-card__footer">
          <InfoCardReferences />
        </footer>
      </Card>
    </InfoCardContext.Provider>
  );
};
