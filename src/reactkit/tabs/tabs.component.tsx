import React, { ReactNode } from 'react';
import {
	TabImageStyled,
	TabPanelStyled,
	TabsListStyled,
	TabsStyled,
	TabStyled,
	TabTitleStyled,
} from 'reactkit/tabs/tabs.styled';

import { SxProps } from '@mui/material';

interface Props {
	readonly value: string;
	readonly onChange: (event: React.SyntheticEvent | null, newValue: string | number | null) => void;
	readonly tabs: ReadonlyArray<Record<string, string>>;
	readonly tabPanels?: {
		panel: ReactNode;
		value: number;
	}[];

	readonly sxTabs?: SxProps;
	readonly sxTabsList?: SxProps;
	readonly sxTabPanel?: SxProps;
}

export const Tabs = ({ value, onChange, tabs, tabPanels, sxTabs, sxTabsList, sxTabPanel }: Props) => {
	return (
		<TabsStyled sx={{ ...sxTabs }} value={value} onChange={onChange}>
			<TabsListStyled sx={{ ...sxTabsList }}>
				{tabs.map(tab => {
					return (
						<TabStyled value={tab.id}>
							{tab.image && <TabImageStyled src={tab.image} alt={tab.title} />}
							<TabTitleStyled>{tab.title.toLowerCase()}</TabTitleStyled>
						</TabStyled>
					);
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
