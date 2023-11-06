import { Button } from '@progress/kendo-react-buttons';
import { Field, Form, FormElement } from '@progress/kendo-react-form';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { Alert, FormDropDownList, FormInput, FormTextArea } from '@tauruseer/core';
import { useEffect, useRef } from 'react';
import { IWorkTrackingTool } from '../../model/product-data-sources.model';
import { TrackItemStatus } from '../../model/tickets.model';
import {
  AvatarList,
  AvatarRenderValue,
} from '../product-configuration/configure-product/custom-content-list';
import {
  getDescriptionFromCognitionData,
  getDescriptionFromVulnerabilityData,
  getTitleFromCognitionData,
  getTitleFromVulnerabilityData,
} from './ticket-utils';

interface ITicketInformationFormProps {
  step: TrackItemStatus;
  setStep: (step: TrackItemStatus) => void;
  workTrackingTool: IWorkTrackingTool | null;
  setLoading: (loading: boolean) => void;
  data: {
    teamMembers: any;
    title: string;
    description: string;
  };
}

export const TicketInformationForm = ({
  step,
  setStep,
  workTrackingTool,
  setLoading,
  data,
}: ITicketInformationFormProps) => {
  const { teamMembers, title, description } = data;
  const ticketFetch = useFetcher();
  const isLoading = ticketFetch.state !== 'idle' ? true : false;
  const formRef = useRef<Form>(null);

  const submitNewTicket = async (formData: { [name: string]: any }) => {
    if (isLoading || !workTrackingTool || !formData['assignee']) return;
    setLoading(true);
    ticketFetch.submit(
      {
        name: formData['ticketTitle'] || title,
        description: formData['ticketDescription'] || description,
        assignee: JSON.stringify(formData['assignee'] || {}),
        workTrackingProjectId: String(workTrackingTool.workTrackingProjectId),
        externalServiceID: String(workTrackingTool.externalServiceId),
      },
      { method: 'post' },
    );
  };

  const disabled = ticketFetch.data != null && !ticketFetch.data?.error;
  const error = ticketFetch.data?.error;

  useEffect(() => {
    setLoading(false);
    if (ticketFetch.data && !ticketFetch.data?.error) {
      setStep(TrackItemStatus.TICKET_CREATED);
    }
  }, [ticketFetch.data]);

  return (
    <>
      {error && (
        <div className="mb-3">
          <Alert title="Error" type="danger" timeToClose={10000} hideCloseButton={true}>
            An error has ocurred during this operation. Please contact support.
          </Alert>
        </div>
      )}
      {step === TrackItemStatus.TICKET_CREATED && (
        <div className="mb-3">
          <Alert title="Ticket Created!" type="success" timeToClose={10000} hideCloseButton={true}>
            The ticket {ticketFetch.data.data.key} has been created on the platform. You can review
            it on this{' '}
            <a
              style={{ textDecoration: 'underline' }}
              href={ticketFetch.data.data.self}
              target="_blank"
              rel="noreferrer"
            >
              link
            </a>
          </Alert>
        </div>
      )}
      <Form
        ref={formRef}
        render={(formRenderProps) => {
          return (
            <FormElement style={{ width: '100%' }}>
              <div className="mb-2">
                <label className="typography-body2 fw-semibold">Ticket Information</label>

                <div className="row">
                  <div className="col-4">
                    <Field
                      id="ticket-title-text-field"
                      name="ticketTitle"
                      label="Title"
                      placeholder="Ticket's title"
                      component={FormInput}
                      disabled={disabled}
                      required={true}
                      defaultValue={title}
                    />

                    <Field
                      id="assignee"
                      name="assignee"
                      label="Assignee"
                      rounded="medium"
                      itemRender={AvatarList}
                      valueRender={AvatarRenderValue}
                      textField="name"
                      dataItemKey="id"
                      fillMode="outline"
                      size="large"
                      component={FormDropDownList}
                      data={teamMembers}
                      disabled={disabled}
                      required={true}
                      fieldValidators={(value: any) =>
                        value == null ? 'Assignee is required' : ''
                      }
                    />
                  </div>

                  <div className="col">
                    <Field
                      id="ticket-description"
                      name="ticketDescription"
                      label="Description"
                      placeholder="Write ticket details"
                      component={FormTextArea}
                      disabled={disabled}
                      required={true}
                      defaultValue={description}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col d-flex justify-content-end mt-4">
                    <Button
                      size="large"
                      rounded="medium"
                      themeColor="dark"
                      fillMode="solid"
                      className={'button button-primary'}
                      type="submit"
                      disabled={disabled || !formRenderProps.allowSubmit}
                    >
                      Create Ticket
                    </Button>
                  </div>
                </div>
              </div>
            </FormElement>
          );
        }}
        onSubmit={submitNewTicket}
      />
    </>
  );
};
