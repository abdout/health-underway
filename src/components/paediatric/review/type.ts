export type ReviewCardProps<T = Record<string, any>> = {
  data: T | null;
};

export type ReviewContainerProps<T = Record<string, any>> = {
  data: T | null;
  isSubmitting: boolean;
  handleSubmit: () => Promise<void>;
};

export type ReviewDialogProps = {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  onClose: () => void;
}; 