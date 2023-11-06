import { Outlet, useFetcher, useNavigate, useParams } from '@remix-run/react';
import { SetFirstLetterToUpperCase } from '@tauruseer/core';
import { useEffect } from 'react';
import OnboardingActions from '../components/onboarding-actions.component';
import { ONBOARDING, setStepsActions } from '../model/onboarding.model';
import { DataSource, OnboardingStore } from '../state/onboarding-storage';
interface OnBoardingDataSourcesProps {
  dataSources: Array<DataSource>;
}
export const OnBoarding = ({ dataSources }: OnBoardingDataSourcesProps) => {
  const dataSourceFetch = useFetcher();
  const { step, dataSource } = useParams();
  const store = OnboardingStore((state) => state);
  const stp = step ? Number(step) : ONBOARDING.welcome;
  const ds = dataSource ? SetFirstLetterToUpperCase([`${dataSource}`]).pop() : '';
  const navigate = useNavigate();
  useEffect(() => {
    if (
      (!dataSources || !dataSources.length) &&
      stp !== ONBOARDING.step1 &&
      stp !== ONBOARDING.welcome
    ) {
      navigate('/onboarding/data-sources/step/1/source/all');
    }
    setStepsActions(stp, store, ds as DataSource);
  }, []);

  const primaryBtnAction = () => {
    if (stp === ONBOARDING.welcome) {
      navigate('/onboarding/data-sources/step/1/source/all');
    } else if (stp === ONBOARDING.step2 && !store.currentSelectedDataSource && dataSources.length) {
      setStepsActions(ONBOARDING.step3, store, 'All');
      navigate('/onboarding/data-sources/step/3/source/all');
    } else if (stp === ONBOARDING.step2 && store.currentSelectedDataSource) {
      setStepsActions(ONBOARDING.step2, store, 'All');
      navigate('/onboarding/data-sources/step/2/source/all');
    } else if (stp === ONBOARDING.step3) {
      dataSourceFetch.submit({ onboardingEnds: `true` }, { method: 'post' });
    }
  };
  const secondaryBtnAction = () => {
    setStepsActions(ONBOARDING.step2, store, 'All');
    navigate('/onboarding/data-sources/step/2/source/all');
  };
  const deleteAction = () => {
    const dataSourceToDelete = store.currentSelectedDataSource || store.selectedDataSourceCard;
    dataSourceFetch.submit({ dataSourceToDelete: `${dataSourceToDelete}` }, { method: 'post' });
  };
  return (
    <div
      className={`mb-4 card card-content align-self-center ${store.containerClsName}`}
      style={{ zIndex: 100 }}
    >
      <div className="d-flex justify-content-center align-items-center">
        <div className="me-4">
          <img
            src="/tauruseer_logo_gradient.svg"
            alt="onboarding-logo"
            style={{ width: '62px', height: '68px' }}
          />
        </div>
        <div>
          <span className="typography-big-title">Tauruseer</span>
        </div>
      </div>
      <Outlet />
      <OnboardingActions
        primaryEvent={primaryBtnAction}
        secondaryEven={secondaryBtnAction}
        deleteDataSource={deleteAction}
      />
    </div>
  );
};

export default OnBoarding;
