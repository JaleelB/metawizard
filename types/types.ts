type ButtonProps = {
  navigateTo?: () => void;
  buttonText: string;
};

export type MultiStepNavigation = {
  prevButton?: ButtonProps;
  nextButton?: ButtonProps;
};
