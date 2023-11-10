import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { Tabs as BaseTabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { styled } from '@mui/material';

export const TabsStyled = styled(BaseTabs)``;

export const TabsListStyled = styled(BaseTabsList)(
	({ theme }) => `
	height: 34px;
  background-color: ${theme.tg_theme.palette.bg_color};
  border-radius: ${theme.tg_theme.borderRadius.actionButton};
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  `,
);

export const TabStyled = styled(BaseTab)(
	({ theme }) => `
  color: ${theme.tg_theme.palette.text_color};
  cursor: pointer;
  font-size: ${theme.tg_theme.fontSize.caption};
  background-color: transparent;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: ${theme.tg_theme.borderRadius.actionButton};
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: all 0.1s ease;

  &:hover {
    background-color: ${theme.tg_theme.palette.button_hover_color};
  }

  &.${tabClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.${tabClasses.selected} {
    font-size: 13px;
    background-color: ${theme.tg_theme.palette.button_color};
    color: ${theme.tg_theme.palette.text_color};
  }
  `,
);

export const TabPanelStyled = styled(BaseTabPanel)(
	({ theme }) => `
    width: 100%;
    font-size: ${theme.tg_theme.fontSize.body};
  `,
);
