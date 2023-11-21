import { switchClasses } from '@mui/base/Switch';
import { styled } from '@mui/material';

export const SwitchStyled = styled('span')(
	({ theme }) => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 42px;
  height: 26px;
  padding: 0;
  cursor: pointer;

  &.${switchClasses.disabled} { 
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchClasses.track} {
    position: absolute;
    background: ${theme.tg_theme.palette.bg_color};
    border: none;
    border-radius: 13px;
    display: block;
    height: 100%;
    width: 100%;
    opacity: 1;
    transition: background-color 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  &:hover .${switchClasses.track} {
    background: ${theme.tg_theme.palette.bg_color};
    border-color: ${theme.tg_theme.palette.bg_color};
  }

  &.${switchClasses.focusVisible} .${switchClasses.track} {
    box-shadow: 0 0 0 3px ${theme.tg_theme.palette.text_color};
  }

  & .${switchClasses.thumb} {
    display: block;
    width: 22px;
    height: 22px;
    top: 0;
    left: 0;
    border-radius: 16px;
    background-color: #FFF;
    position: relative;
    padding: 0;
    margin: 2px;
    transition: left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; 
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
  }

  &.${switchClasses.checked} {
    .${switchClasses.thumb} {
      left: 16px;
      background-color: #fff;
    }

    .${switchClasses.track} {
      border: none;
      background: #65C466;
    }
  }

  &:hover .${switchClasses.checked} .${switchClasses.track} {
    background: red;
  }

  & .${switchClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
  `,
);
