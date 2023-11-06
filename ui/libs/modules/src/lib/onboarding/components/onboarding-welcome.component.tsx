export const OnboardingWelcome = () => {
  return (
    <>
      <p className="typography-body2 fw-semibold text-center mt-5">Welcome to Tauruseer!</p>
      <p className="text-center typography-h2">
        <span className="fw-bold">We have detected is your first time using the platform.</span>
        <span className="fw-normal"> Awesome!</span>
      </p>
      <p
        className="text-center typography-h2 fw-normal align-self-center mt-4"
        style={{ width: '90%' }}
      >
        The Tauruseer platform is ready to setup your organization space and comply with all the
        needs for you. There are some few elements we need to configure to have the org space
        completely functional. You can set up this elements whenever you want, but as it is your
        first time we can help you, just follow this easy onboarding process!
      </p>
      <p className="text-center typography-h2 align-self-center mt-4" style={{ width: '85%' }}>
        <span className="fw-bold">Click the button to begin our onboarding</span> an finishing the
        setup of the space,
        <span className="fw-bold">or you can skip this process and continue</span> at your own pace.
      </p>
    </>
  );
};
export default OnboardingWelcome;
