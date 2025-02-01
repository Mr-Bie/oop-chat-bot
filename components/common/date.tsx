type DateCompProp = {
  date: Date;
};

export default function DateComp({ date }: DateCompProp) {
  return <span>{date.toLocaleDateString('fa-IR')}</span>;
}
