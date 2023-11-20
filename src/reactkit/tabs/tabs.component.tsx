import React, { ReactNode } from 'react';
import {
	TabImageStyled,
	TabPanelStyled,
	TabPriceStyled,
	TabsListStyled,
	TabsStyled,
	TabStyled,
	TabTitleStyled,
} from 'reactkit/tabs/tabs.styled';

import { SxProps } from '@mui/material';

import bike from 'assets/bike.webp';

interface Props {
	readonly onChange: (e: React.SyntheticEvent | null, newValue: string | number | null) => void;
	// TODO change type
	readonly tabs: any;
	readonly tabPanels?: {
		panel: ReactNode;
		value: number;
	}[];

	readonly sxTab?: SxProps;
	readonly sxTabs?: SxProps;
	readonly sxTabsList?: SxProps;
	readonly sxTabPanel?: SxProps;
}

export const Tabs = ({ onChange, tabs, tabPanels, sxTab, sxTabs, sxTabsList, sxTabPanel }: Props) => {
	const defaultValue = tabs?.[0].id;

	return (
		<TabsStyled sx={{ ...sxTabs }} defaultValue={defaultValue} onChange={onChange}>
			<TabsListStyled sx={{ ...sxTabsList }}>
				{tabs.map((tab: Record<string, string>) => {
					return (
						<TabStyled value={tab.id} sx={{ ...sxTab }}>
							{tab.image && <TabImageStyled src={bike} alt={tab.title} />}
							<TabTitleStyled>{tab.title.toLowerCase()}</TabTitleStyled>
							{tab.price && <TabPriceStyled>{tab.price}</TabPriceStyled>}
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
