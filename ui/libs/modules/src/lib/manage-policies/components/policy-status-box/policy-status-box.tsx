interface IPolicyStatusBoxProps {
  status: string;
}

export function PolicyStatusBox({ status }: IPolicyStatusBoxProps) {
  return (
    <div className={`manage-policies-status status-${status === 'active' ? 'active' : 'inactive'}`}>
      {status}
    </div>
  );
}
