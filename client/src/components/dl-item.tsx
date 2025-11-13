import { dataLabelStyle } from "../utils/styles";

type Props = {
	label: string;
	value: React.ReactNode;
};

export const DlItem = ({ label, value }: Props) => {
	return (
		<dl className="flex flex-col leading-6 sm:flex-row sm:items-center sm:justify-between">
			<dt className={dataLabelStyle}>{label}</dt>
			<dd>{value}</dd>
		</dl>
	);
};
