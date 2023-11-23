import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { Tabs as BaseTabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { styled, Typography } from '@mui/material';

export const TabsStyled = styled(BaseTabs)``;

export const TabsListStyled = styled(BaseTabsList)(
	({ theme }) => `
	width: fit-content;
	min-height: 34px;
    background-color: ${theme.tg_theme.palette.bg_color};
    border-radius: ${theme.tg_theme.borderRadius.actionButton};
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
);

export const TabStyled = styled(BaseTab)(
	({ theme }) => `
    color: ${theme.tg_theme.palette.text_color};
    cursor: pointer;
    font-size: ${theme.tg_theme.fontSize.caption};
    background-color: transparent;
    border: none;
    border-radius: ${theme.tg_theme.borderRadius.actionButton};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    outline: none;
    transition: all 0.1s ease;
    padding: 4px 8px;
    min-height: 30px;
    
    &:hover {
      background-color: ${theme.tg_theme.palette.button_hover_color};
    }
  
    &.${tabClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  
    &.${tabClasses.selected} {
      background-color: ${theme.tg_theme.palette.button_color};
      color: ${theme.tg_theme.palette.text_color};
    }
  `,
);

export const TabImageStyled = styled('img')(
	() => `
      display: block;
      width: 3rem;
  `,
);

export const TabTitleStyled = styled(Typography)(
	({ theme }) => `
      margin: 0px;
      display: flex;
      line-height: 1;
      font-size: ${theme.tg_theme.fontSize.caption};
      font-weight: ${theme.tg_theme.fontWeight.bold};
      align-items: center;
      justify-content: center;
      text-transform: capitalize;  
  `,
);

export const TabPriceStyled = styled(Typography)(
	({ theme }) => `
      margin-top: 4px;
      display: flex;
      line-height: 1;
      color: ${theme.tg_theme.palette.button_disabled_color};
      font-size: ${theme.tg_theme.fontSize.caption};
      font-weight: ${theme.tg_theme.fontWeight.bold};
      align-items: center;
      justify-content: center;
  `,
);

export const TabPanelStyled = styled(BaseTabPanel)(
	({ theme }) => `
    width: 100%;
    font-size: ${theme.tg_theme.fontSize.body};
  `,
);
