import React, { ReactNode } from 'react';
import { TabPanelStyled, TabsListStyled, TabsStyled, TabStyled } from 'reactkit/tabs/tabs.styled';

import { SxProps } from '@mui/material';

interface Props<TabValue extends number> {
	readonly value: TabValue;
	readonly onChange: () => void;
	readonly tabs: string[];
	readonly tabPanels?: {
		panel: ReactNode;
		value: number;
	}[];

	readonly sxTabs?: SxProps;
	readonly sxTabsList?: SxProps;
	readonly sxTabPanel?: SxProps;
}

export const Tabs = <TabValue extends number>({
	value,
	onChange,
	tabs,
	tabPanels,
	sxTabs,
	sxTabsList,
	sxTabPanel,
}: Props<TabValue>) => {
	return (
		<TabsStyled sx={{ ...sxTabs }} value={value} onChange={onChange}>
			<TabsListStyled sx={{ ...sxTabsList }}>
				{tabs.map(tab => {
					return <TabStyled>{tab}</TabStyled>;
				})}
			</TabsListStyled>
			{tabPanels?.map(({ panel, value }) => {
				return (
					<TabPanelStyled sx={{ ...sxTabPanel }} value={value}>
						{panel}
					</TabPanelStyled>
				);
			})}
		</TabsStyled>
	);
};
