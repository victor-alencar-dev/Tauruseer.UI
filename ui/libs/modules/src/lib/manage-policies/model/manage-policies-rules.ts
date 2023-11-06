export const ManagePolicyRulesGridModel = [
  {
    field: 'toolType',
    title: 'Rule Type',
    customCell: 'ToolTypeCellComponent',
  },
  {
    field: 'technologyName',
    title: 'Rule Value',
  },
  {
    field: 'ruleResult',
    title: 'Rule Result',
    customCell: 'RuleResultCellComponent',
  },
  {
    field: 'notes',
    title: 'Notes',
  },
];

export const PolicyRulesGridData = [
  {
    type: 'Technology',
    value: 'Java',
    result: 'Required',
    notes: 'This rule was a test by the devs',
  },
  {
    type: 'Tool',
    value: 'Amazon Web Services',
    result: 'Approved',
    notes: 'This rule was a test by the devs',
  },
  { type: 'Tool', value: 'Azure', result: 'Approved', notes: 'This rule was a test by the devs' },
  {
    type: 'Technology',
    value: '.Net',
    result: 'Approved',
    notes: 'This rule was a test by the devs',
  },
  {
    type: 'Technology',
    value: 'Application Insights',
    result: 'Prohibited',
    notes: 'This rule was a test by the devs',
  },
];

export const PolicyTraceData = [
  {
    date: 'January 2023',
    logs: [
      {
        title: 'Policy rule created',
        icon: 'fa-solid fa-circle-info',
        type: 'warning',
        description: 'Technology Java is Required',
        date: 'Jan 02, 2023',
      },
    ],
  },
  {
    date: 'December 2022',
    logs: [
      {
        title: 'Policy rule created',
        icon: 'fa-solid fa-circle-info',
        type: 'warning',
        description: 'Tool Amazon Web Services is Approved',
        date: 'Dec 17, 2023',
      },
      {
        title: 'Policy Updated',
        icon: 'fa-solid fa-circle-info',
        description: 'Log4j was edited by Jeremy Vaughan.',
        date: 'Dec 08, 2023',
      },
    ],
  },
  {
    date: 'October 2022',
    logs: [
      {
        title: 'Policy rule created',
        icon: 'fa-solid fa-circle-info',
        type: 'warning',
        description: 'Tool Azure is Approved',
        date: 'Oct 23, 2023',
      },
      {
        title: 'Policy Rule Created',
        icon: 'fa-solid fa-circle-info',
        type: 'danger',
        description: 'Technology Application Insight is Prohibited',
        date: 'Oct 02, 2023',
      },
    ],
  },
];
