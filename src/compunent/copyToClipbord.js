import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const CopyToclipbord = (props) => {
    const [open, setOpen] = React.useState(false);
    const [state,setState]=React.useState({
        value: '',
        copied: false,
      });

    const handleTooltipClose = () => {
      setOpen(false);
    };
  
    const handleTooltipOpen = () => {
      setOpen(true);
    };
    return (
        <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
        <Tooltip
            PopperProps={{
            disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title="Copied"
        >
        <div onClick={handleTooltipOpen}> 
        <CopyToClipboard text={props.text?props.text:''}
    onCopy={() => setState({...state,copied: true})}>
            {/*  */}
            {props.compunent?props.compunent:null}
    </CopyToClipboard>
        </div>
        </Tooltip>
        </div>
    </ClickAwayListener>
    )
}

export default CopyToclipbord
