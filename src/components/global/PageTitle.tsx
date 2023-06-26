type Props = {
  title: string;
};

const PageTitle = ({ title }: Props) => {
  return <h2 className="mb-8 text-3xl font-bold text-[#111827]">{title}</h2>;
};

export default PageTitle;
