import { DataSource, OnboardingStorage } from '../state/onboarding-storage';

export enum ONBOARDING {
  welcome = 0,
  step1 = 1,
  step2 = 2,
  step3 = 3,
}

export const setStepsActions = (
  step: ONBOARDING,
  store: OnboardingStorage,
  dataSource: DataSource,
) => {
  switch (step) {
    case ONBOARDING.welcome:
      store.setStep(ONBOARDING.welcome);
      store.setSecondaryBtnVisible(false);
      store.setCurrentContainerClsName('onboarding-container-welcome');
      store.setActionDisabled(false);
      store.setDeleteBtnDisabled(true);
      store.setDeleteBtnEnabled(false);
      store.setPrimaryBtnText('Get Started');
      return true;
    case ONBOARDING.step1:
      store.setStep(ONBOARDING.step1);
      store.setSecondaryBtnVisible(false);
      store.setCurrentContainerClsName('onboarding-container-septs');
      store.setActionDisabled(true);
      store.setDeleteBtnDisabled(true);
      store.setDeleteBtnEnabled(false);
      store.setPrimaryBtnText('Continue');
      return true;
    case ONBOARDING.step2:
      store.setStep(ONBOARDING.step2);
      store.setCurrentContainerClsName('onboarding-container-septs');
      store.setSecondaryBtnVisible(false);
      if (dataSource !== 'All') {
        store.setCurrentSelectedDataSource(dataSource);
        store.setDeleteBtnDisabled(false);
        store.setDeleteBtnEnabled(true);
        store.setPrimaryBtnText('Save');
        store.setDataSource(dataSource);
      } else {
        store.setCurrentSelectedDataSource(null);
        store.setDeleteBtnDisabled(true);
        store.setDeleteBtnEnabled(false);
        store.setPrimaryBtnText('Continue');
      }

      return true;
    case ONBOARDING.step3:
      store.setStep(ONBOARDING.step3);
      store.setCurrentContainerClsName('onboarding-container-septs');
      store.setPrimaryBtnText('Finish Onboarding');
      store.setSecondaryBtnVisible(true);
      store.setCurrentSelectedDataSource(null);
      store.setDeleteBtnDisabled(true);
      store.setDeleteBtnEnabled(false);

      return true;
    default:
      return {
        primaryBtnText: 'Next',
        secondaryBtnText: 'Skip',
      };
  }
};
